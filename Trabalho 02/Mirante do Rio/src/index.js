//import './style.css'
import _ from 'lodash';
import * as THREE from 'three';
//import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function CriarPisoMirante(){
    var g = new THREE.PlaneGeometry(25,25);
    var t = loader.load('../assets/pisoMirante.jpg');
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.magFilter = THREE.NearestFilter;
    t.repeat.set(12,12);
    
    var ma = new THREE.MeshPhongMaterial({map: t, side: THREE.DoubleSide});
    var p = new THREE.Mesh(g, ma);
    p.rotation.x = Math.PI * -.5;
    scene.add(p);
    
    p.position.y = -3;
    p.receiveShadow = true;
  }
const loader = new THREE.TextureLoader();
const controlador = new OrbitControls(camera, renderer.domElement);

function animacao(){
  requestAnimationFrame(animacao);
  
  
  renderer.render(scene,camera);
}


var light = new THREE.AmbientLight(new THREE.Color(0xFFFFFF),1);
light.castShadow = true;
//light.target.position.set(0,0,0);
light.position.set(0,10,10);
scene.add(light);
//scene.add(light.target);


CriarPisoMirante();
animacao();



/*
import _ from 'lodash';

 function component() {
   const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
 */