import * as THREE from '../libs/three.module.js'
 
class MyCylinder extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cilindro
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var cylinderGeom = new THREE.CylinderGeometry( this.guiControls.radiusTop, this.guiControls.radiusBottom,this.guiControls.height,this.guiControls.resolution);
    var cylinderMat = new THREE.MeshNormalMaterial;
    cylinderMat.flatShading = true;
    cylinderMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cylinder);
  }
  
  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.radiusTop = 1;
      this.radiusBottom = 1;
      this.height = 1.0;
      this.resolution = 3;
    } 
    
    var that = this;
    // Se crea una sección para los controles del cilindro
    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radiusTop', 1, 5.0, 0.1).name ('Radio Superior: ').listen()
    .onChange(function(radiusTop){that.changeGeometry();});
    
    folder.add(this.guiControls,'radiusBottom',1,5.0,0.1).name('Radio Inferior: ').listen()
    .onChange(function(radiusBottom){that.changeGeometry();});

    folder.add(this.guiControls,'height',1.0,5.0,0.1).name('Altura: ').listen();

    folder.add(this.guiControls,'resolution',3,20,1).name('Resolución: ').listen()
    .onChange(function(resolution){that.changeGeometry(); });
  }
  
  update () {
    this.scale.set(this.guiControls.radiusTop,this.guiControls.height,this.guiControls.radiusBottom);
    this.cylinder.rotation.z += 0.02;
    this.cylinder.rotation.y += 0.02;
  }

  changeGeometry(){
    var cylinderGeom = new THREE.CylinderGeometry(this.guiControls.radiusTop,this.guiControls.radiusBottom,this.guiControls.height,this.guiControls.resolution);
    this.cylinder.geometry = cylinderGeom;
  }
}

export { MyCylinder };
