// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a 3x3x3 Rubik's Cube
const cubeSize = 1;
const spacing = 0.1;
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const materials = [
  new THREE.MeshBasicMaterial({color: 0xff0000}), // Red
  new THREE.MeshBasicMaterial({color: 0x00ff00}), // Green
  new THREE.MeshBasicMaterial({color: 0x0000ff}), // Blue
  new THREE.MeshBasicMaterial({color: 0xffff00}), // Yellow
  new THREE.MeshBasicMaterial({color: 0xffa500}), // Orange
  new THREE.MeshBasicMaterial({color: 0xffffff})  // White
];

const cubes = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      const cube = new THREE.Mesh(geometry, materials);
      cube.position.set(x * (cubeSize + spacing), y * (cubeSize + spacing), z * (cubeSize + spacing));
      scene.add(cube);
      cubes.push(cube);
    }
  }
}

camera.position.z = 10;

// Check if the cube is solved
function isSolved() {
  // Simplified check: all cubes on each face should have the same color
  const faces = [
    cubes.filter(cube => cube.position.x === -1),
    cubes.filter(cube => cube.position.x === 1),
    cubes.filter(cube => cube.position.y === -1),
    cubes.filter(cube => cube.position.y === 1),
    cubes.filter(cube => cube.position.z === -1),
    cubes.filter(cube => cube.position.z === 1)
  ];

  return faces.every(face => {
    const color = face[0].material[0].color;
    return face.every(cube => cube.material[0].color.equals(color));
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the entire cube for visualization
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  // Check if the cube is solved
  if (isSolved()) {
    console.log("Congratulations! The cube is solved!");
    // You can add more end-game logic here, like displaying a message or stopping the game
  }

  renderer.render(scene, camera);
}

animate();
