"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

type SceneControls = { burst: () => void; reset: () => void; sync: () => void };
type Body = { mesh: THREE.Mesh; velocity: THREE.Vector3; radius: number };

/** Procedural geometry and studio lighting: no models, textures, or remote assets. */
export function SignalScene({ mode, paused }: { mode: "hero" | "play"; paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<SceneControls | null>(null);
  const pausedRef = useRef(paused);
  const [pulses, setPulses] = useState(0);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    controls.current?.sync();
  }, [paused]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let started = false;
    const load = async () => {
      if (started) return;
      started = true;
      const [T, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        element.dataset.failed = "true";
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      element.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new T.Scene();
      const room = new RoomEnvironment();
      const pmrem = new T.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(room, .04, .1, 100, { size: 128 });
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();
      const camera = new T.PerspectiveCamera(35, 1, .1, 100);
      camera.position.set(0, 0, mode === "hero" ? 13 : 11);
      const group = new T.Group();
      scene.add(group);
      scene.add(new T.HemisphereLight(0xfaf4e4, 0x34382c, 2.2));
      const key = new T.DirectionalLight(0xffebda, 4);
      key.position.set(-4, 6, 5);
      scene.add(key);
      const rim = new T.DirectionalLight(0xd5e7ff, 3);
      rim.position.set(5, -2, 1);
      scene.add(rim);
      const chrome = new T.MeshStandardMaterial({ color: 0xbfc8c5, metalness: 1, roughness: .16 });
      const orange = new T.MeshPhysicalMaterial({ color: 0xf45b25, metalness: .38, roughness: .22, clearcoat: 1 });
      const ivory = new T.MeshStandardMaterial({ color: 0xe6e9ce, metalness: .15, roughness: .3 });
      const graphite = new T.MeshStandardMaterial({ color: 0x202b29, metalness: .8, roughness: .22 });
      const disposableMaterials: THREE.Material[] = [chrome, orange, ivory, graphite];
      const geometries: THREE.BufferGeometry[] = [];
      const bodies: Body[] = [];
      const satellites: THREE.Mesh[] = [];
      let core: THREE.Mesh | undefined;
      let orbit: THREE.Mesh | undefined;
      let particleCloud: THREE.Points | undefined;
      let particlePositions: Float32Array | undefined;
      let particleSeeds: Float32Array | undefined;
      let pointerLight: THREE.PointLight | undefined;
      let burst = 0;
      let rotation = 0;
      let time = 0;
      let halfWidth = 5;
      let halfHeight = 4;
      let inView = true;
      let raf = 0;
      let last = 0;
      let contextLost = false;
      const pointer = new T.Vector2();
      const pointerWorld = new T.Vector3();
      const lightTarget = new T.Vector3();
      const raycaster = new T.Raycaster();
      const plane = new T.Plane(new T.Vector3(0, 0, 1), 0);
      const delta = new T.Vector3();
      const relativeVelocity = new T.Vector3();
      let held: Body | null = null;
      let activePointer: number | null = null;
      let lastPointerTime = 0;

      if (mode === "hero") {
        const geometry = new T.TorusKnotGeometry(1.52, .48, 128, 20, 2, 3);
        geometries.push(geometry);
        core = new T.Mesh(geometry, chrome);
        core.rotation.set(.25, -.4, -.25);
        group.add(core);
        const ringGeometry = new T.TorusGeometry(2.7, .047, 12, 150);
        geometries.push(ringGeometry);
        orbit = new T.Mesh(ringGeometry, orange);
        orbit.rotation.set(1.15, .35, -.25);
        group.add(orbit);
        const satelliteGeometry = new T.SphereGeometry(.18, 24, 16);
        geometries.push(satelliteGeometry);
        for (let i = 0; i < 7; i++) {
          const satellite = new T.Mesh(satelliteGeometry, i % 2 ? chrome : orange);
          satellites.push(satellite);
          group.add(satellite);
        }
        // A deliberately small generative field: its movement is calculated from the same
        // raycast point as the rest of the scene, so the response originates at the pointer.
        const particleGeometry = new T.BufferGeometry();
        particlePositions = new Float32Array(560 * 3);
        particleSeeds = new Float32Array(560 * 3);
        for (let i = 0; i < 560; i++) {
          const a = i * 2.39996;
          const radius = 2.3 + (i % 17) * .19;
          particleSeeds[i * 3] = Math.cos(a) * radius;
          particleSeeds[i * 3 + 1] = ((i % 13) - 6) * .34;
          particleSeeds[i * 3 + 2] = Math.sin(a) * radius * .6;
        }
        particlePositions.set(particleSeeds);
        particleGeometry.setAttribute("position", new T.BufferAttribute(particlePositions, 3));
        geometries.push(particleGeometry);
        const particleMaterial = new T.PointsMaterial({ color: 0xffd16c, size: .055, transparent: true, opacity: .82, depthWrite: false });
        disposableMaterials.push(particleMaterial);
        particleCloud = new T.Points(particleGeometry, particleMaterial);
        group.add(particleCloud);
        pointerLight = new T.PointLight(0xffbd61, 0, 8, 2);
        pointerLight.position.set(0, 0, 2);
        group.add(pointerLight);
      } else {
        const sphere = new T.SphereGeometry(1, 28, 20);
        const torus = new T.TorusGeometry(.73, .27, 16, 40);
        const knot = new T.TorusKnotGeometry(.55, .18, 64, 12, 2, 3);
        geometries.push(sphere, torus, knot);
        for (let i = 0; i < 16; i++) {
          const mesh = new T.Mesh([sphere, torus, knot][i % 3], [orange, chrome, ivory, graphite][i % 4]);
          const radius = .56 + (i % 4) * .12;
          mesh.scale.setScalar(radius);
          mesh.rotation.set(i * .7, i * .4, i * .2);
          bodies.push({ mesh, radius, velocity: new T.Vector3() });
          group.add(mesh);
        }
      }

      const reset = () => {
        const columns = halfWidth < 3 ? 3 : 6;
        const rows = Math.ceil(bodies.length / columns);
        const cellWidth = (halfWidth * 2 - .2) / columns;
        const cellHeight = (halfHeight * 2 - .2) / rows;
        bodies.forEach((body, i) => {
          body.radius = Math.min(.56 + (i % 4) * .12, Math.min(cellWidth, cellHeight) * .43);
          body.mesh.scale.setScalar(body.radius);
          body.mesh.position.set(((i % columns) - (columns - 1) / 2) * cellWidth, halfHeight - .1 - cellHeight * (Math.floor(i / columns) + .5), 0);
          body.velocity.set(Math.sin(i * 3) * .7, 0, 0);
        });
      };
      const render = () => { if (!contextLost) renderer.render(scene, camera); };
      const resize = () => {
        const width = Math.max(element.clientWidth, 1);
        const height = Math.max(element.clientHeight, 1);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        halfHeight = Math.tan(T.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        halfWidth = halfHeight * camera.aspect;
        if (mode === "hero") group.scale.setScalar(Math.min(1, halfWidth / 3.25));
        else reset();
        render();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(element);
      resize();

      // Small bounded physics world. Fixed substeps keep collision behavior stable.
      const simulate = (dt: number) => {
        for (const body of bodies) {
          if (body === held) continue;
          body.velocity.y -= 9 * dt;
          body.velocity.multiplyScalar(Math.pow(.997, dt * 60));
          body.mesh.position.addScaledVector(body.velocity, dt);
          body.mesh.rotation.x += body.velocity.y * dt * .22;
          body.mesh.rotation.z -= body.velocity.x * dt * .35;
          const xLimit = Math.max(body.radius, halfWidth - body.radius - .08);
          const floor = -halfHeight + body.radius + .1;
          if (Math.abs(body.mesh.position.x) > xLimit) {
            body.mesh.position.x = Math.sign(body.mesh.position.x) * xLimit;
            body.velocity.x *= -.72;
          }
          if (body.mesh.position.y < floor) {
            body.mesh.position.y = floor;
            body.velocity.y = Math.abs(body.velocity.y) * .58;
            body.velocity.x *= .98;
          }
          if (body.mesh.position.y > halfHeight - body.radius) {
            body.mesh.position.y = halfHeight - body.radius;
            body.velocity.y = -Math.abs(body.velocity.y) * .65;
          }
        }
        for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j];
          delta.subVectors(b.mesh.position, a.mesh.position);
          const distance = delta.length();
          const separation = a.radius + b.radius;
          if (distance >= separation) continue;
          if (distance < .0001) delta.set(1, 0, 0); else delta.divideScalar(distance);
          const overlap = separation - distance;
          if (a !== held) a.mesh.position.addScaledVector(delta, -overlap * .5);
          if (b !== held) b.mesh.position.addScaledVector(delta, overlap * .5);
          const relative = relativeVelocity.subVectors(b.velocity, a.velocity).dot(delta);
          if (relative < 0) {
            if (a !== held) a.velocity.addScaledVector(delta, relative * .82);
            if (b !== held) b.velocity.addScaledVector(delta, -relative * .82);
          }
        }
      };
      const animate = (now: number) => {
        raf = 0;
        if (disposed || contextLost || !inView || document.hidden || pausedRef.current) return;
        // Cap GPU work while keeping DOM transitions at the display refresh rate.
        if (last && now - last < 1000 / 30) {
          raf = requestAnimationFrame(animate);
          return;
        }
        const dt = Math.min((now - (last || now)) / 1000, .05);
        last = now;
        time += dt;
        if (mode === "hero") {
          burst *= Math.exp(-dt * 2.2);
          rotation += dt * (.14 + burst * 1.8);
          group.rotation.y += (pointer.x * .35 - group.rotation.y) * Math.min(dt * 4, 1);
          group.rotation.x += (-pointer.y * .2 - group.rotation.x) * Math.min(dt * 4, 1);
          if (core) {
            core.rotation.y = rotation;
            core.rotation.z = -.25 + Math.sin(time * .4) * .12;
            core.position.y = Math.sin(time * .8) * .12;
            core.scale.setScalar(1 + burst * .08);
          }
          if (orbit) orbit.rotation.z = time * .12;
          satellites.forEach((satellite, i) => {
            const angle = time * .3 + i * Math.PI * 2 / satellites.length;
            const radius = 2.7 + burst * (.6 + i * .1);
            satellite.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * .55, Math.sin(angle) * radius * .8);
          });
          if (pointerLight) {
            lightTarget.set(pointerWorld.x, pointerWorld.y, 2);
            pointerLight.position.lerp(lightTarget, Math.min(dt * 7, 1));
            pointerLight.intensity += ((Math.abs(pointer.x) + Math.abs(pointer.y)) * 2.5 + .35 - pointerLight.intensity) * Math.min(dt * 6, 1);
          }
          if (particleCloud && particlePositions && particleSeeds) {
            for (let i = 0; i < particlePositions.length; i += 3) {
              const sx = particleSeeds[i], sy = particleSeeds[i + 1], sz = particleSeeds[i + 2];
              const dx = sx - pointerWorld.x, dy = sy - pointerWorld.y;
              const distance = Math.max(.25, Math.hypot(dx, dy));
              const pull = Math.max(0, 1 - distance / 4.3) * (1.05 + burst * .7);
              particlePositions[i] += (sx + dx / distance * pull * .72 - particlePositions[i]) * Math.min(dt * 7, 1);
              particlePositions[i + 1] += (sy + dy / distance * pull * .72 + Math.sin(time * 1.7 + i) * .04 - particlePositions[i + 1]) * Math.min(dt * 7, 1);
              particlePositions[i + 2] += (sz - pull * .38 - particlePositions[i + 2]) * Math.min(dt * 7, 1);
            }
            (particleCloud.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
          }
        } else {
          for (let step = 0; step < 3; step++) simulate(dt / 3);
        }
        render();
        raf = requestAnimationFrame(animate);
      };
      const sync = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        if (!document.hidden && inView && !pausedRef.current && !contextLost) raf = requestAnimationFrame(animate);
        else render();
      };
      const release = () => {
        held = null;
        if (activePointer !== null && renderer.domElement.hasPointerCapture(activePointer)) renderer.domElement.releasePointerCapture(activePointer);
        activePointer = null;
        element.classList.remove("is-grabbing");
      };
      const locate = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        raycaster.ray.intersectPlane(plane, pointerWorld);
      };
      const move = (event: PointerEvent) => {
        if (pausedRef.current) return;
        locate(event);
        if (!held) return;
        const dt = Math.max((event.timeStamp - lastPointerTime) / 1000, .016);
        delta.subVectors(pointerWorld, held.mesh.position);
        held.velocity.copy(delta).divideScalar(dt).clampLength(0, 22);
        held.mesh.position.set(
          T.MathUtils.clamp(pointerWorld.x, -halfWidth + held.radius, halfWidth - held.radius),
          T.MathUtils.clamp(pointerWorld.y, -halfHeight + held.radius, halfHeight - held.radius), 0,
        );
        lastPointerTime = event.timeStamp;
      };
      const down = (event: PointerEvent) => {
        if (pausedRef.current || mode !== "play") return;
        locate(event);
        const hit = raycaster.intersectObjects(bodies.map(body => body.mesh))[0];
        if (!hit) return;
        held = bodies.find(body => body.mesh === hit.object) ?? null;
        activePointer = event.pointerId;
        renderer.domElement.setPointerCapture(event.pointerId);
        lastPointerTime = event.timeStamp;
        element.classList.add("is-grabbing");
      };
      const leave = () => { pointer.set(0, 0); };
      const lost = (event: Event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(raf); element.dataset.ready = "false"; setAvailable(false); };
      const restored = () => { contextLost = false; element.dataset.ready = "true"; setAvailable(true); sync(); };
      renderer.domElement.addEventListener("pointermove", move);
      renderer.domElement.addEventListener("pointerdown", down);
      renderer.domElement.addEventListener("pointerup", release);
      renderer.domElement.addEventListener("pointercancel", release);
      renderer.domElement.addEventListener("lostpointercapture", release);
      renderer.domElement.addEventListener("pointerleave", leave);
      renderer.domElement.addEventListener("webglcontextlost", lost);
      renderer.domElement.addEventListener("webglcontextrestored", restored);
      document.addEventListener("visibilitychange", sync);
      const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }, { rootMargin: "60px" });
      observer.observe(element);
      controls.current = {
        burst: () => {
          if (pausedRef.current) return;
          burst = 1;
          bodies.forEach((body, i) => body.velocity.set(Math.sin(i * 2.4 + time) * 8, 8 + (i % 5) * 1.4, 0));
        },
        reset: () => { release(); reset(); burst = 0; render(); },
        sync,
      };
      satellites.forEach((satellite, i) => {
        const angle = i * Math.PI * 2 / satellites.length;
        satellite.position.set(Math.cos(angle) * 2.7, Math.sin(angle) * 1.5, Math.sin(angle) * 2.2);
      });
      element.dataset.ready = "true";
      setAvailable(true);
      render();
      sync();
      cleanup = () => {
        release();
        observer.disconnect();
        resizeObserver.disconnect();
        cancelAnimationFrame(raf);
        document.removeEventListener("visibilitychange", sync);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        renderer.domElement.removeEventListener("webglcontextrestored", restored);
        geometries.forEach(geometry => geometry.dispose());
        disposableMaterials.forEach(material => material.dispose());
        environment.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        controls.current = null;
      };
    };
    const lazyObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        lazyObserver.disconnect();
        void load().catch(() => { if (!disposed) element.dataset.failed = "true"; });
      }
    }, { rootMargin: "400px" });
    lazyObserver.observe(element);
    return () => { disposed = true; lazyObserver.disconnect(); cleanup?.(); };
  }, [mode]);

  return <div className={`signal-scene signal-scene-${mode}`}>
    <div ref={host} className="webgl-surface" role="img" aria-label={mode === "hero" ? "Reflective silver signal core with a copper orbit, responding to pointer movement" : "Interactive playground of metallic spheres, rings, and knots"}>
      <div className="scene-fallback" aria-hidden="true"><span/><span/><span/></div>
    </div>
    <div className="scene-ui">
      <span className="scene-instruction">{!available ? "FORM / FUNCTION / FEELING" : paused ? "STILL LOOKING GOOD. MOTION PAUSED." : mode === "hero" ? "MOVE YOUR POINTER. FOLLOW THE CURRENT." : "DRAG & TOSS. OR GIVE THEM A LITTLE ENERGY."}</span>
      <div className="scene-buttons"><button disabled={paused || !available} onClick={() => { controls.current?.burst(); setPulses(count => count + 1); }}>{mode === "hero" ? "Send a pulse" : "Scatter objects"}<span aria-hidden="true">↗</span></button>{mode === "play" && <button disabled={!available} onClick={() => { controls.current?.reset(); setPulses(0); }}>Reset <span aria-hidden="true">↺</span></button>}</div>
    </div>
    <span className="sr-only" role="status">{pulses > 0 ? `${pulses} ${mode === "hero" ? "pulses sent" : "bursts launched"}` : ""}</span>
  </div>;
}
