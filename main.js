// ===== SCENE SETUP =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===== PLAYER =====
const player = {
  height: 1.8,
  velocityY: 0,
  speed: 0.12,
  canJump: false,
  spawn: new THREE.Vector3(0, 1.8, 0) // respawn position
};

camera.position.copy(player.spawn);

// ===== LIGHT =====
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444));

// ===== PLATFORMS =====
const platforms = [];

function createPlatform(x, y, z) {
  const geo = new THREE.BoxGeometry(5, 1, 5);
  const mat = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const platform = new THREE.Mesh(geo, mat);
  platform.position.set(x, y, z);
  scene.add(platform);
  platforms.push(platform);
}

// Ground platform
createPlatform(0, -0.5, 0);

// Parkour platforms
createPlatform(6, 1, -5);
createPlatform(12, 3, -10);
createPlatform(18, 5, -15);
createPlatform(24, 7, -20);

// ===== INPUT =====
const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// Mouse look
document.body.addEventListener("click", () => {
  document.body.requestPointerLock();
});

document.addEventListener("mousemove", e => {
  if (document.pointerLockElement === document.body) {
    camera.rotation.y
