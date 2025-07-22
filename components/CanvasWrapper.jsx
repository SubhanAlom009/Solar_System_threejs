"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { setupSolarSystem } from "./solarSystem";
import ControlsPanel from "./ControlsPanel";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function CanvasWrapper() {
  const mountRef = useRef(null);
  const speedsRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = isPaused;

  const [planetSpeeds, setPlanetSpeeds] = useState({
    Mercury: 0.01,
    Venus: 0.008,
    Earth: 0.007,
    Mars: 0.006,
    Jupiter: 0.004,
    Saturn: 0.0035,
    Uranus: 0.002,
    Neptune: 0.0015,
  });
  speedsRef.current = planetSpeeds;

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    const solarSystem = setupSolarSystem(scene);

    // 🌍 Animate
    const clock = new THREE.Clock();
    let frameid;
    const animate = () => {
      frameid = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (!pausedRef.current) {
        solarSystem.sun.rotation.y += 0.5 * delta;
        solarSystem.starField.rotation.y += 0.0002;

        solarSystem.planets.forEach((planet) => {
          const speed = speedsRef.current[planet.name];
          planet.angle += speed * delta * 60;
          planet.mesh.rotation.y += 0.1 * delta;
          planet.mesh.position.x = planet.radius * Math.cos(planet.angle);
          planet.mesh.position.z = planet.radius * Math.sin(planet.angle);
        });
      }

      controls.update();
      composer.render();
    };

    animate();

    return () => {
      cancelAnimationFrame(frameid);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Three.js Canvas Layer - will be on the bottom */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* UI Layer - will be on top */}
      <ControlsPanel
        speeds={planetSpeeds}
        setSpeeds={setPlanetSpeeds}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
    </div>
  );
}
