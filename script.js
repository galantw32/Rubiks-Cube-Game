// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cube pieces
const cubeSize = 1;
const spacing = 0.1;
const cubes = [];
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffa500, 0xffffff];

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const materials = colors.map(color => new THREE.MeshBasicMaterial({color}));
            const cube = new THREE.Mesh(geometry, materials);
            cube.position.set(x * (cubeSize + spacing), y * (cubeSize + spacing), z * (cubeSize + spacing));
            scene.add(cube);
            cubes.push(cube);
        }
    }
}

camera.position.z = 5;

// Rotation function
function rotateFace(axis, direction) {
    cubes.forEach(cube => {
        if (cube.position[axis] > 0) {
            cube.rotation[axis] += direction * Math.PI / 2;
        }
    });
}

// Controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowRight': rotateFace('y', 1); break;
        case 'ArrowLeft': rotateFace('y', -1); break;
        case 'ArrowUp': rotateFace('x', 1); break;
        case 'ArrowDown': rotateFace('x', -1); break;
    }
});

// Scramble function
function scramble() {
    for (let i = 0; i < 20; i++) {
        const axis = ['x', 'y', 'z'][Math.floor(Math.random() * 3)];
        const direction = Math.random() < 0.5 ? 1 : -1;
        rotateFace(axis, direction);
    }
}

// Reset function
function reset() {
    cubes.forEach(cube => {
        cube.rotation.set(0, 0, 0);
    });
}

// Button controls
document.getElementById('scramble').addEventListener('click', scramble);
document.getElementById('reset').addEventListener('click', reset);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
