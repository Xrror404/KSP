import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const textureLoader = new THREE.TextureLoader();
// const boxTexture = textureLoader.load('./public/spinning-cat.jpg');

// Create a simple box
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// WASD controls
const keys = {};
window.addEventListener('keydown', (event) => (keys[event.key] = true));
window.addEventListener('keyup', (event) => (keys[event.key] = false));

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // WASD Rotation
  if (keys['w']) box.rotation.x -= 0.05;
  if (keys['s']) box.rotation.x += 0.05;
  if (keys['a']) box.rotation.y -= 0.05;
  if (keys['d']) box.rotation.y += 0.05;

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
