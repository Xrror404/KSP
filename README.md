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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
```

This imports the Three.js library, which is essential for creating and rendering 3D scenes.

## Project Structure

Here's a brief overview of the project structure:

```
├── src
│   ├── main.js        // Main entry point
│   ├── index.html     // HTML file to host the project
│   └── styles.css     // CSS styles
├── public
│   ├── models         // 3D objects and models
│   └── assets         // Textures, images, and other assets (if necesarry)
└── package.json       // Project metadata and dependencies
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
