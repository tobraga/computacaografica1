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
  }