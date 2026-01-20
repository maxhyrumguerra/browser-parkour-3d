// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player
const player = {
  height: 1.8,
  velocityY: 0,
  speed: 0.1,
  canJump: false
};

camera.position.y = player.height;

// Ground
const groundGeo = new THREE.BoxGeometry(50, 1, 50);
const groundMat = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = -0.5;
scene.add(ground);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

// Movement
const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// Mouse look
document.body.addEventListener("click", () => {
  document.body.requestPointerLock();
});

document.addEventListener("mousemove", e => {
  if (document.pointerLockElement === document.body) {
    camera.rotation.y -= e.movementX * 0.002;
    camera.rotation.x -= e.movementY * 0.002;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
  }
});

// Game loop
function animate() {
  requestAnimationFrame(animate);

  // Movement
  const dir = new THREE.Vector3();
  if (keys["KeyW"]) dir.z -= 1;
  if (keys["KeyS"]) dir.z += 1;
  if (keys["KeyA"]) dir.x -= 1;
  if (keys["KeyD"]) dir.x += 1;

  dir.applyAxisAngle(new THREE.Vector3(0,1,0), camera.rotation.y);
  camera.position.addScaledVector(dir, player.speed);

  // Gravity
  player.velocityY -= 0.01;
  camera.position.y += player.velocityY;

  // Ground collision
  if (camera.position.y <= player.height) {
    camera.position.y = player.height;
    player.velocityY = 0;
    player.canJump = true;
  }

  // Jump (SPACE)
  if (keys["Space"] && player.canJump) {
    player.velocityY = 0.2;
    player.canJump = false;
  }

  renderer.render(scene, camera);
}

animate();
