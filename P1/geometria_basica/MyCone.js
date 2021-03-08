import * as THREE from '../libs/three.module.js'
 
class MyCone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cilindro
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var coneGeom = new THREE.ConeGeometry( this.guiControls.radius,this.guiControls.height,this.guiControls.resolution);
    var coneMat = new THREE.MeshNormalMaterial;
    coneMat.flatShading = true;
    coneMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.cone = new THREE.Mesh (coneGeom, coneMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cone);
  }
  
  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.radius = 1;
      this.height = 1.0;
      this.resolution = 3;
    } 
    
    var that = this;
    // Se crea una sección para los controles del cilindro
    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radius', 1, 5.0, 0.1).name ('Radio : ').listen()
    .onChange(function(radius){that.changeGeometry();});

    folder.add(this.guiControls,'height',1.0,5.0,0.1).name('Altura: ').listen();

    folder.add(this.guiControls,'resolution',3,20,1).name('Resolución: ').listen()
    .onChange(function(resolution){that.changeGeometry(); });
  }
  
  update () {
    this.scale.set(this.guiControls.radius,this.guiControls.height);
    this.cone.rotation.z += 0.02;
    this.cone.rotation.y += 0.02;
  }

  changeGeometry(){
    var coneGeom = new THREE.ConeGeometry(this.guiControls.radius,this.guiControls.height,this.guiControls.resolution);
    this.cone.geometry = coneGeom;
  }
}

export { MyCone };
