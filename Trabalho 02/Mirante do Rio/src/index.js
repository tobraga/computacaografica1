'use strict';

// Import Threejs.
//var THREE = require('three');
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Import stats.
//import * as Stats from 'stats.js';

// Scene.
var camera, scene, renderer, light;
var orbitControls;

// Stats.
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function init() {

  // Camera.
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 2000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 500);

  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer( { canvas } );
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener('resize', onWindowResize, false);

  // Orbit controls.
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enablePan = true;
  orbitControls.enableKeys = false;
  orbitControls.update();
  orbitControls.addEventListener('change', render);

  // Adding orbit controls to camera (expected by AMI image widgets).
  camera.controls = orbitControls;

  // Scene.
  scene = new THREE.Scene();

  // Lights.
  light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(-600, 600, 1000);
  scene.add(light);

}

// Draw Scene
function render() {
  stats.update()
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  render()
}

// start scene
init();
render();