import * as THREE from '../libs/three.module.js'
 
class MyIcosahedron extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cilindro
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var icosahedronGeom = new THREE.IcosahedronGeometry(this.guiControls.radius,this.guiControls.detail);
    var icosahedronMat = new THREE.MeshNormalMaterial;
    icosahedronMat.flatShading = true;
    icosahedronMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.icosahedron = new THREE.Mesh (icosahedronGeom, icosahedronMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.icosahedron);
  }
  
  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.radius = 1;
      this.detail = 0;
    } 
    
    var that = this;
    // Se crea una sección para los controles del cilindro
    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radius', 1, 5.0, 0.1).name ('Radio : ').listen();

    folder.add(this.guiControls,'detail',0,3,1).name('Subdivisión: ').listen()
    .onChange(function(detail){that.changeGeometry(); });
  }
  
  update () {
    this.scale.set(this.guiControls.radius,this.guiControls.radius, this.guiControls.radius);
    this.icosahedron.rotation.z += 0.02;
    this.icosahedron.rotation.y += 0.02;
  }

  changeGeometry(){
    var icosahedronGeom = new THREE.IcosahedronGeometry(this.guiControls.radius,this.guiControls.detail);
    this.icosahedron.geometry = icosahedronGeom;
  }
}

export { MyIcosahedron };
