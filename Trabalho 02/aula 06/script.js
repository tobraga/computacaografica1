import {OrbitControls} from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
//import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controlador = new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();

var geometria = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({map: loader.load('https://images.rawpixel.com/image_png_300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcC1zNzUtdGVkLTY0NDYtcGxveS0wMS5wbmc.png?s=MiFuNPSoulhhFVct3E21k6T3O6sofAiZU4-9gI2XVi0')});

var cubo = new THREE.Mesh(geometria, material);
scene.add(cubo);
camera.position.z = 5;

geometria = new THREE.CylinderGeometry(1, 1, 2,50);
material = new THREE.MeshPhongMaterial({map: loader.load('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm29-jite-220-rosegold-metallic_2.jpg?w=400&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=39c9885ae29d0187bd2f00837f423c7a')});

var cilindro = new THREE.Mesh(geometria, material);
scene.add(cilindro);
cilindro.position.x = 3;


geometria = new THREE.SphereGeometry(1,25,25);
material = new THREE.MeshPhongMaterial({map: loader.load('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pd234-pdstieglitz00200-image_1.jpg?w=400&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=a64f4c0f839dec7047b1d17f26de4734')});

var esfera = new THREE.Mesh(geometria, material);

esfera.position.x = -4;    
scene.add(esfera);



function animacao(){
  requestAnimationFrame(animacao);
  
  renderer.render(scene,camera);
}

//var light = new THREE.AmbientLight(new THREE.Color(0xFFFFFF), 1);
//var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
var light = new THREE.SpotLight(new THREE.Color(0xFFFFFF), 1);

scene.add(light);

light.target.position.set(0,5,0);
scene.add(light);
var ajudante = new THREE.PointLightHelper(light);
scene.add(ajudante);

light.position.z = 10;


animacao();
renderer.render(scene,camera);

