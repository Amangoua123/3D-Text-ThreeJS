import { map } from "astro:schema";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { TextGeometry } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

// Environnment Map
// const hdrLoader = new HDRLoader();
// hdrLoader.load("./src/textures/environmentMap/2k.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

// GUI
const gui = new GUI();
// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// textures
const textLoader = new THREE.TextureLoader();
const mapCapTexture = textLoader.load("src/textures/matcaps/8.png");

// Fonts

const fontLoader = new FontLoader();

fontLoader.load("src/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
    depth: 0.1,
  });
  const material = new THREE.MeshMatcapMaterial({
    matcap: mapCapTexture,
  });

  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    // Add randomness
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();

    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

// Objects

// const material = new THREE.MeshBasicMaterial({ color: "white" });
// const geometry = new THREE.BoxGeometry(1.1);
// const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);

// Renderer
const renderer = new THREE.WebGLRenderer();

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = e.clientY / size.height - 0.5;
});

window.addEventListener("resize", () => {
  // Sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  // Camera Update
  camera.aspect = size.width / size.height;
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Creating textures
// const textureLoader = new THREE.TextureLoader();
// const doorTexture = textureLoader.load("./src/textures/door/color.jpg");
// const matcapTexture = textureLoader.load("./src/textures/matcaps/1.png");
// const doorHeightTexture = textureLoader.load("./src/textures/door/height.jpg");
// const doorAlphaTexture = textureLoader.load("./src/textures/door/color.jpg");
// const doorNormalTexture = textureLoader.load("./src/textures/door/normal.jpg");
// const doorAmbientTexture = textureLoader.load("./src/textures/door/color.jpg");
// const gradientTexture = textureLoader.load("./src/textures/gradients/3.jpg");
// const metalnessTexture = textureLoader.load(
//   "./src/textures/door/metalness.jpg",
// );
// const roughnessTexture = textureLoader.load(
//   "./src/textures/door/roughness.jpg",
// );
// const doorAmbientOcclusionTexture = textureLoader.load(
//   "./src/textures/door/color.jpg",
// );

// doorTexture.colorSpace = THREE.SRGBColorSpace;

// // Create a group
// const group = new THREE.Group();

// Objects

// const materiel = new THREE.MeshStandardMaterial();
// materiel.metalness = 1;
// materiel.roughness = 1;
// materiel.map = doorTexture;
// materiel.aoMap = doorAmbientOcclusionTexture;
// materiel.aoMapIntensity = 1;
// materiel.displacementMap = doorHeightTexture;
// materiel.displacementScale = 0.1;
// materiel.metalnessMap = metalnessTexture;
// materiel.roughnesssMap = roughnessTexture;
// materiel.normalMap = doorNormalTexture;
// materiel.normalScale.set(0.5, 0.5);
// materiel.transparent = true;
// materiel.alphaMap = doorAlphaTexture;

// MeshPhysicalMaterial
// const materiel = new THREE.MeshPhysicalMaterial();
// materiel.metalness = 0;
// materiel.roughness = 0;
// // materiel.map = doorTexture;
// // materiel.aoMap = doorAmbientOcclusionTexture;
// // materiel.aoMapIntensity = 1;
// // materiel.displacementMap = doorHeightTexture;
// // materiel.displacementScale = 0.1;
// // materiel.metalnessMap = metalnessTexture;
// // materiel.roughnesssMap = roughnessTexture;
// // materiel.normalMap = doorNormalTexture;
// // materiel.normalScale.set(0.5, 0.5);
// // materiel.transparent = true;
// // materiel.alphaMap = doorAlphaTexture;

// // DEBUG UI
// gui.add(materiel, "metalness", 0, 1, 0.01);
// gui.add(materiel, "roughness", 0, 1, 0.01);

// // Clearcot
// materiel.clearcoat = 1;
// materiel.clearcoatRoughness = 0;
// gui.add(materiel, "clearcoat", 0, 1, 0.01);
// gui.add(materiel, "clearcoatRoughness", 0, 1, 0.01);

// // Sheen
// materiel.sheen = 1;
// materiel.sheenColor.set(1, 1, 1);
// materiel.sheenRoughness = 0.25;

// gui.add(materiel, "sheen", 0, 1, 0.01);
// gui.add(materiel, "sheenRoughness", 0, 1, 0.01);
// gui.addColor(materiel, "sheenColor");

// Iridescence

// materiel.iridescence = 1;
// materiel.iridescenceIOR = 1;
// materiel.iridescenceThicknessRange = [100, 800];

// Transmission
// materiel.transmission = 1;
// materiel.ior = 1.5;
// materiel.thickness = 0.5;

// gui.add(materiel, "transmission", 0, 1, 0.001);
// gui.add(materiel, "ior", 1, 10, 0.001);
// gui.add(materiel, "thickness", 0, 1, 0.001);

// const geo = new THREE.PlaneGeometry(1, 1, 100, 100);
// const cube = new THREE.Mesh(geo, materiel);
// cube.position.x = 1.5;

// materiel.map = doorTexture;
// mat.color = new THREE.Color("white");
// mat.wireframe = true;
// mat.side = THREE.DoubleSide;

// 3D text

// import font from "three/examples/fonts/helvetiker_regular.typeface.json";
// const loader = new FontLoader();
// loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
//   const geometry = new TextBufferGeometry("Hello World", {
//     font: font,
//     size: 5,
//     height: 1,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 0.1,
//     bevelSize: 0.1,
//     bevelSegments: 3,
//   });
// });

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000,
);

camera.position.z = 5;
camera.position.x = 0;
scene.add(camera);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const timer = new THREE.Timer();

// Animate Func
const animate = () => {
  const elapsed = timer.getElapsed();

  timer.update();
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();

// Renderer
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

// Add the renderer's canvas element to the document body
canvas.appendChild(renderer.domElement);
