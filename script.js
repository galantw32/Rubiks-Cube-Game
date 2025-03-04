import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, pencil, dragon, fire;
let gameOver = false;
let score = 0;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  
  // Create pencil
  const pencilGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
  const pencilMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  pencil = new THREE.Mesh(pencilGeometry, pencilMaterial);
  scene.add(pencil);

  // Create dragon
  const dragonGeometry = new THREE.BoxGeometry(2, 2, 2);
  const dragonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  dragon = new THREE.Mesh(dragonGeometry, dragonMaterial);
  dragon.position.set(10, 0, 10);
  scene.add(dragon);

  // Create fire
  const fireGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const fireMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
  fire = new THREE.Mesh(fireGeometry, fireMaterial);
  fire.visible = false;
  scene.add(fire);

  camera.position.z = 15;
}

function animate() {
  requestAnimationFrame(animate);

  if (!gameOver) {
    // Move dragon towards pencil
    dragon.position.x += (pencil.position.x - dragon.position.x) * 0.01;
    dragon.position.z += (pencil.position.z - dragon.position.z) * 0.01;

    // Shoot fire
    if (Math.random() < 0.02) {
      fire.position.copy(dragon.position);
      fire.visible = true;
    }

    if (fire.visible) {
      fire.position.x += (pencil.position.x - fire.position.x) * 0.1;
      fire.position.z += (pencil.position.z - fire.position.z) * 0.1;

      // Check collision
      if (fire.position.distanceTo(pencil.position) < 1) {
        gameOver = true;
        alert('Game Over! Score: ' + score);
      }
    }

    score++;
  }

  renderer.render(scene, camera);
}

function onKeyDown(event) {
  const speed = 0.5;
  switch (event.key) {
    case 'ArrowUp':
      pencil.position.z -= speed;
      break;
    case 'ArrowDown':
      pencil.position.z += speed;
      break;
    case 'ArrowLeft':
      pencil.position.x -= speed;
      break;
    case 'ArrowRight':
      pencil.position.x += speed;
      break;
  }
}

init();
animate();
document.addEventListener('keydown', onKeyDown);
