import * as THREE from "three";

export function setupSolarSystem(scene) {
  // 🌞 Sun
  const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    emissive: 0xffa500,
    emissiveIntensity: 1,
  });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sunMesh);

  // 🌌 Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 2, 100);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  const loader = new THREE.TextureLoader();
  loader.load("/2k_stars.jpg", function (texture) {
    scene.background = texture;
  });

  // 🌍 Planet config array
  const planetsConfig = [
    { name: "Mercury", radius: 4, size: 0.3, color: 0xaaaaaa, speed: 0.01 },
    { name: "Venus", radius: 6, size: 0.5, color: 0xffcc99, speed: 0.008 },
    { name: "Earth", radius: 8, size: 0.6, color: 0x3399ff, speed: 0.007 },
    { name: "Mars", radius: 10, size: 0.4, color: 0xff3300, speed: 0.006 },
    { name: "Jupiter", radius: 13, size: 1.2, color: 0xff9966, speed: 0.004 },
    { name: "Saturn", radius: 16, size: 1.0, color: 0xffcc66, speed: 0.0035 },
    { name: "Uranus", radius: 19, size: 0.9, color: 0x66ccff, speed: 0.002 },
    { name: "Neptune", radius: 22, size: 0.9, color: 0x3366ff, speed: 0.0015 },
  ];

  const planets = planetsConfig.map((planet) => {
    const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: planet.color });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return {
      name: planet.name,
      mesh,
      radius: planet.radius,
      angle: 0,
      speed: planet.speed,
    };
  });

  return {
    sun: sunMesh,
    planets,
  };
}
