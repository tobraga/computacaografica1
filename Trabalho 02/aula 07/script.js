import {OrbitControls} from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
//import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function CriarPiso(){
  var g = new THREE.PlaneGeometry(25,25);
  var t = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
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

const controlador = new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();

var geometria = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({map: loader.load('https://images.rawpixel.com/image_png_300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcC1zNzUtdGVkLTY0NDYtcGxveS0wMS5wbmc.png?s=MiFuNPSoulhhFVct3E21k6T3O6sofAiZU4-9gI2XVi0')});

var cubo = new THREE.Mesh(geometria, material);
cubo.castShadow = true;
cubo.receiveShadow = true;

scene.add(cubo);


camera.position.z = 5;

geometria = new THREE.CylinderGeometry(1, 1, 2,50);
material = new THREE.MeshPhongMaterial({map: loader.load('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm29-jite-220-rosegold-metallic_2.jpg?w=400&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=39c9885ae29d0187bd2f00837f423c7a')});

var cilindro = new THREE.Mesh(geometria, material);
scene.add(cilindro);
cilindro.castShadow = true;
cilindro.receiveShadow = true;
cilindro.position.x = 3;


geometria = new THREE.SphereGeometry(1,25,25);
material = new THREE.MeshPhongMaterial({map: loader.load('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pd234-pdstieglitz00200-image_1.jpg?w=400&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=a64f4c0f839dec7047b1d17f26de4734')});

var esfera = new THREE.Mesh(geometria, material);

esfera.position.x = -4;    
esfera.castShadow = true;
esfera.receiveShadow = true;
scene.add(esfera);




function animacao(){
  requestAnimationFrame(animacao);
  
  renderer.render(scene,camera);
}

//var light = new THREE.AmbientLight(new THREE.Color(0xFFFFFF), 1);
//var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
var light = new THREE.SpotLight(new THREE.Color(0xFFFFFF), 1);


light.castShadow = true;
light.target.position.set(0,0,0);
light.position.set(0,10,10);
scene.add(light);
scene.add(light.target);

light.shadow.camera.zoom = 0.1;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;

//light.shadow.mapSize.width = 1024;
//light.shadow.mapSize.height = 1024;

var ajudante = new THREE.PointLightHelper(light);
scene.add(ajudante);

var ajudante2 = new THREE.CameraHelper(light.shadow.camera);
scene.add(ajudante2);

CriarPiso();
animacao();

