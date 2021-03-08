import * as THREE from '../libs/three.module.js'
 
class MyTorus extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    this.createGUI(gui,titleGui);
    
    var torusGeom = new THREE.TorusGeometry( this.guiControls.radius, this.guiControls.tube,this.guiControls.torus_resolution,this.guiControls.tube_resolution);
    var torusMat = new THREE.MeshNormalMaterial;
    torusMat.flatShading = true;
    torusMat.needsUpdate = true;
    
    this.torus = new THREE.Mesh (torusGeom, torusMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.torus);
  }
  
  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.radius = 1.0;
      this.tube = 0.2;
      this.torus_resolution = 3;
      this.tube_resolution = 3;
    } 
    
    var that = this;
    // Se crea una sección para los controles del cilindro
    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radius', 1.0, 5.0, 0.1).name ('Radio Principal: ').listen();
    
    folder.add(this.guiControls,'tube',0.2,5.0,0.1).name('Radio Tubo: ').listen()
    .onChange(function(radiusBottom){that.changeGeometry();});

    folder.add(this.guiControls,'torus_resolution',3,15,1).name('Resolución Toro: ').listen()
    .onChange(function(height){that.changeGeometry(); });

    folder.add(this.guiControls,'tube_resolution',3,15,1).name('Resolución Tubo: ').listen()
    .onChange(function(resolution){that.changeGeometry(); });
  }
  
  update () {
    this.scale.set(this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);
    this.torus.rotation.z += 0.02;
    this.torus.rotation.y += 0.02;
  }

  changeGeometry(){
    var torusGeom = new THREE.TorusGeometry(this.guiControls.radius, this.guiControls.tube,this.guiControls.torus_resolution,this.guiControls.tube_resolution);
    this.torus.geometry = torusGeom;
  }
}

export { MyTorus };
