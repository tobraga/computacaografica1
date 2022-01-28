const cena = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100); //nossos olhos

const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight); //tamanho da tela

document.body.appendChild(renderizador.domElement);


//adicionando um cubo
const geometria = new THREE.BoxGeometry (2,1,3);//forma
const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); //tipo do material = cor
var cubo = new THREE.Mesh(geometria, material); //criando o cubo - sua gemotria e material

cena.add(cubo); //cubo adicionado a cena no ponto (0,0,0)

camera.position.z = 5; //posição da camera mais afastada

//criando um cilindro
const geometria2 = new THREE.CylinderGeometry(1, 1, 2, 25);
const material2 = new THREE.MeshBasicMaterial({color: 0xfff000});
var cilindro = new THREE.Mesh(geometria2, material2);
cilindro.position.x = 3;

cena.add(cilindro);


//criando um cone
const geometria3 = new THREE.ConeGeometry(1, 2, 25); //raio, altura, qtd de detalhes
const material3 = new THREE.MeshBasicMaterial({color: 0xff007f});
var cone = new THREE.Mesh(geometria3, material3);
cone.position.x = -3;
cena.add(cone);

//esfera
const geometria4 = new THREE.SphereGeometry(1, 25, 25); //raio, altura, qtd de detalhes
const material4 = new THREE.MeshBasicMaterial({color: 0xffab15});
var esfera = new THREE.Mesh(geometria4, material4);
esfera.position.x = 7;
cena.add(esfera);


//plano
const geometria5 = new THREE.PlaneGeometry(1, 2);
const material5 = new THREE.MeshBasicMaterial({color: 0x0f0});
var plano = new THREE.Mesh(geometria5, material5);
plano.position.x = -6;
cena.add(plano);


renderizador.render(cena, camera); // renderizador para rodar a cena

