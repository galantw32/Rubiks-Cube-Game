const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeSize = 1;
const spacing = 0.1;

function createCubePiece(x, y, z) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const materials = [
        new THREE.MeshBasicMaterial({color: 0xff0000}), // Red
        new THREE.MeshBasicMaterial({color: 0xff8c00}), // Orange
        new THREE.MeshBasicMaterial({color: 0xffffff}), // White
        new THREE.MeshBasicMaterial({color: 0xffff00}), // Yellow
        new THREE.MeshBasicMaterial({color: 0x00ff00}), // Green
        new THREE.MeshBasicMaterial({color: 0x0000ff})  // Blue
    ];
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x * (cubeSize + spacing), y * (cubeSize + spacing), z * (cubeSize + spacing));
    return cube;
}

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const piece = createCubePiece(x, y, z);
            scene.add(piece);
        }
    }
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.01;
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
