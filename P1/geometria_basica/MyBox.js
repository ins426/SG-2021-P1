import * as THREE from '../libs/three.module.js'
 
class MyBox extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial;
    boxMat.flatShading = true;
    boxMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (box);
  
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
    } 
    
    var that = this;
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 1.0, 10.0, 1).name ('Dimensión X : ').listen()
    folder.add (this.guiControls, 'sizeY', 1.0, 10.0, 1).name ('Dimensión Y : ').listen()
    folder.add (this.guiControls, 'sizeZ', 1.0, 10.0, 1).name ('Dimensión Z : ').listen()

  }
  
  update () {
    this.guiControls.rotZ += 0.02;
    this.guiControls.rotY += 0.02;

    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    this.rotation.set(this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
  }

}

export { MyBox };
