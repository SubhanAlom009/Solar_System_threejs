import * as THREE from "three";

export function setupSolarSystem(scene) {
  // 🌞 Sun
  const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    emissive: 0xffa500,
    emissiveIntensity: 3.0,
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
  loader.load("/textures/2k_stars.jpg", function (texture) {
    scene.background = texture;
  });

  // 🌍 Planet config array
  const planetsConfig = [
    {
      name: "Mercury",
      radius: 4,
      size: 0.3,
      speed: 0.01,
      texture: "/textures/2k_mercury.jpg",
    },
    {
      name: "Venus",
      radius: 6,
      size: 0.5,
      speed: 0.008,
      texture: "/textures/2k_venus_surface.jpg",
    },
    {
      name: "Earth",
      radius: 8,
      size: 0.6,
      speed: 0.007,
      texture: "/textures/2k_earth_daymap.jpg",
    },
    {
      name: "Mars",
      radius: 10,
      size: 0.4,
      speed: 0.006,
      texture: "/textures/2k_mars.jpg",
    },
    {
      name: "Jupiter",
      radius: 13,
      size: 1.2,
      speed: 0.004,
      texture: "/textures/2k_jupiter.jpg",
    },
    {
      name: "Saturn",
      radius: 16,
      size: 1.0,
      speed: 0.0035,
      texture: "/textures/2k_saturn.jpg",
      ringTexture: "/textures/8k_saturn_ring_alpha.png",
      hasRing: true,
    },
    {
      name: "Uranus",
      radius: 19,
      size: 0.9,
      speed: 0.002,
      texture: "/textures/2k_uranus.jpg",
    },
    {
      name: "Neptune",
      radius: 22,
      size: 0.9,
      speed: 0.0015,
      texture: "/textures/2k_neptune.jpg",
    },
  ];

  const planets = planetsConfig.map((planet) => {
    const texture = loader.load(planet.texture);
    const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: planet.color,
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);

    if (planet.hasRing) {
      const ringGeometry = new THREE.RingGeometry(
        planet.size * 1.3,
        planet.size * 1.5,
        128
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: loader.load(planet.ringTexture),
        side: THREE.DoubleSide,
        // transparent: true,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 2.5;

      mesh.add(ringMesh);
    }

    scene.add(mesh);

    return {
      name: planet.name,
      mesh,
      radius: planet.radius,
      angle: 0,
      speed: planet.speed,
    };
  });

  const orbits = [];

  planetsConfig.forEach((planet) => {
    const orbitGeometry = new THREE.RingGeometry(
      planet.radius - 0.01,
      planet.radius + 0.01,
      64
    );
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;

    scene.add(orbit);
    orbits.push(orbit);
  });

  // 🌌 Realistic Star Background (inside-out sphere)
  const starTexture = new THREE.TextureLoader().load(
    "/textures/2k_stars_milky_way.jpg"
  );
  const starGeometry = new THREE.SphereGeometry(300, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide,
  });
  const starField = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starField);

  return {
    sun: sunMesh,
    planets,
    orbits,
    starField,
  };
}
