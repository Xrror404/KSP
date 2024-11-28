# Three.js Project with Vite

This project is built using [Three.js](https://threejs.org/), a powerful JavaScript library for 3D graphics on the web, and [Vite](https://vitejs.dev/), a fast development server and build tool.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed. You'll use npm (Node Package Manager) to install dependencies.

## Installation

1. **Install dependencies:**

   Run the following command in your terminal to install the required packages:

   ```bash
   # three.js
   npm install --save three

   # vite
   npm install --save-dev vite
   ```

   This will install all the necessary dependencies defined in the `package.json` file.

## Running the Project

To start the project, run:

```bash
npx vite
```

This will start the development server and open your project in the default web browser.

## Required Imports

At the top of your main JavaScript file (usually `src/main.js`), include the following imports:

```javascript
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; // For loading the model
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js"; // For camera control using pointer
```

This imports the Three.js library, which is essential for creating and rendering 3D scenes.

## Project Structure

Here's a brief overview of the project structure:

```
├── public
│   ├── models         // 3D objects and models
│   └── assets         // Textures, images, and other assets (if necesarry)
├── main.js            // Main entry point
├── index.html         // HTML file to host the project
└── package.json       // Project metadata and dependencies
```

## Codes

Here's how to setup a Three.js scene:

```javascript
const scene = new THREE.Scene();
```

Here's how to setup a camera:

```javascript
const camera = new THREE.PerpectiveCamera(
  100, // FOV / Field of View
  window.innerWidth / window.innerHeight, // Camera's aspect ratio
  0.1, // Minimum visibility
  1000 // Maximum visibility
);
camera.position.x = 0; // Set the camera's x spawn position
camera.position.y = 15; // Set the camera's y spawn position
camera.position.z = 0; // Set the camera's z spawn position
```

Here's how to setup the renderer using WEBGL:

```javascript
const renderer = new THREE.WebGLRenderer(); // Set the renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer to match the screen size
renderer.shadowMap.enabled = true; // Activate the shadowMap for rendering shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set the shadowmap into PCFSoftShadowMap for a smoother shadow
renderer.outputEncoding = THREE.sRGBEncoding; // Set the outputEncoding into sRGBEncoding
renderer.setClearColor(new THREE.Color(255 / 255, 255 / 255, 255 / 255)); // Set the renderer's background color
```

Here's how to setup an ambient light to light up the scene:

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Set the ambient light's color and intensity
scene.add(ambientLight); // Adding the ambient light into the scene
```

Here's how to setup an point light for object's the points light into a scene:

```javascript
const pointLight = new THREE.PointLight(null, 450000); // Set the point light's color and intensity
pointLight.position.set(0, 0, 0); // Set the position of the light
pointLight.castShadow = true; // Activate the shadow casting
pointLight.shadow.mapSize.width = 2048; // Set the shadowMap width
pointLight.shadow.mapSize.height = 2048; // Set the shadowMap height
scene.add(pointLight); // Adding the point light into the scene
```

Here's how to setup a ground using PlaneGeometry:

```javascript
// Set the ground geometry and material
const groundGeometry = new THREE.PlaneGeometry(500, 500);
const groundMaterial = new THREE.MeshBasicMaterial();

const ground = new THREE.Mesh(groundGeometry, groundMaterial); // Make the ground object from the groundGeometry and groundMaterial
ground.rotation.x = -Math.PI / 2; // Set the rotation of the ground so it matches the axis
ground.visible = false; // Set the ground into invisible
scene.add(ground); // Adding the ground into the scene
```

Here's how to load models using Promise

```javascript
const sun; // declare variable

async function loadModels(){
  const sunPromise = new Promise((resolve, reject) => {
    loader.load(
      "/models/sun/scene.gltf", // Loading the model from the model's directory
      function (gltf) {
        sun = gltf.scene; // Insert the model into the variable
        scene.add(sun); // Adding the model into the scene
        sun.scale.set(0.1, 0.1, 0.1); // Set the model's scale
        sun.position.set(30, 200, -100); // Set the model's position
        resolve();
      },
      undefined,
      reject
    );
  });

  await Promise.all([
    sunPromise
  ])

  // To activate the shadow casting for the objects
  sun.traverse(function (child) {
    if(child.isMesh){
      child.castShadow = true;
      child.receiveShadow = true;
    }
  })
}
```

Here's how to make the camera's movement using keyboard control:

```javascript
// Set the object for keyboard control first
const keyboardControls = {
  w: false,
  a: false,
  s: false,
  d: false,
};

// Setting up an event for each object if the keyboard is pressed down
function onKeyDown(event) {
  switch (event.code) {
    case "KeyW":
      keyboardControls.w = true;
      break;
    case "KeyA":
      keyboardControls.a = true;
      break;
    case "KeyS":
      keyboardControls.s = true;
      break;
    case "KeyD":
      keyboardControls.d = true;
      break;
  }
}

// Setting up an event for each object if the keyboard is being let go
function onKeyUp(event) {
  switch (event.code) {
    case "KeyW":
      keyboardControls.w = false;
      break;
    case "KeyA":
      keyboardControls.a = false;
      break;
    case "KeyS":
      keyboardControls.s = false;
      break;
    case "KeyD":
      keyboardControls.d = false;
      break;
  }
}

document.addEventListener("keydown", onKeyDown); // Adding the keyDown event
document.addEventListener("keyup", onKeyUp); // Adding the keyUp event
```

Here's how to animate the models:

```javascript
function animate() {
  requestAnimationFrame(animate);

  // Animate whatever models you want here...

  if (sun) {
    sun.rotation.x += 0.1;
  }

  const moveVector = new THREE.Vector3();
  if (keyboardControls.w) {
    moveVector.z -= 0.1;
    if (camera.position.y != -0.1) {
      moveVector.z = 0;
      camera.position.position.y = 15;
    }
  }

  if (keyboardControls.s) {
    moveVector.z += 0.1;
    if (marsRover.position.y != -0.1) {
      moveVector.z = 0;
      camera.position.y = 15;
    }
  }

  if (keyboardControls.a) {
    moveVector.x -= 0.1;
  }

  if (keyboardControls.d) {
    moveVector.x += 0.1;
  }

  moveVector.applyQuaternion(camera.quaternion);
  camera.position.add(moveVector);

  renderer.render(scene, camera);
}

animate();
```

## Example Code

Here's a basic example of setting up a Three.js scene:

```javascript
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
