const cena = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100); //nossos olhos

const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight); //tamanho da tela

document.body.appendChild(renderizador.domElement);


//adicionando um cubo
const geometria = new THREE.BoxGeometry;//forma
const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); //tipo do material = cor
const cubo = new THREE.Mesh(geometria, material); //criando o cubo - sua gemotria e material

cena.add(cubo); //cubo adicionado a cena no ponto (0,0,0)

camera.position.z = 5; //posição da camera mais afastada

renderizador.render(cena, camera); // renderizador para rodar a cena

