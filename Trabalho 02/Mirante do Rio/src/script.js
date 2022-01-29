import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
import {OrbitControls} from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
//import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controlador = new OrbitControls(camera, renderer.domElement);

var geometria = new THREE.BoxGeometry(2,2);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

var cubo = new THREE.Mesh(geometria, material);
scene.add(cubo);
camera.position.z = 5;

geometria = new THREE.CylinderGeometry(1, 1, 2,50);
material = new THREE.MeshBasicMaterial({color: 0xfff000});

var cilindro = new THREE.Mesh(geometria, material);
scene.add(cilindro);
cilindro.position.x = 3;

geometria = new THREE.ConeGeometry(1,2,25);
material = new THREE.MeshBasicMaterial({color: 0xFF007F});

var cone = new THREE.Mesh(geometria, material);

scene.add(cone);

cone.position.x = -3;

geometria = new THREE.SphereGeometry(1,25,25);
material = new THREE.MeshBasicMaterial({color: 0xffab15});

var esfera = new THREE.Mesh(geometria, material);

esfera.position.x = 7;    
scene.add(esfera);


geometria = new THREE.PlaneGeometry(1,2);
material = new THREE.MeshBasicMaterial({color: 0x0f0});
var plano = new THREE.Mesh(geometria, material);

plano.position.x = -7;
scene.add(plano);

function animacao(){
  requestAnimationFrame(animacao);
  
  plano.rotation.y += 0.01;
  
  renderer.render(scene,camera);
}

animacao();
renderer.render(scene,camera);


