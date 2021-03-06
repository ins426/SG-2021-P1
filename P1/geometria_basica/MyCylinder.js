import * as THREE from '../libs/three.module.js'
 
class MyCylinder extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cilindro
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var cylinderGeom = new THREE.CylinderGeometry( this.guiControls.radiusTop, 0.5,1,10);
    var cylinderMat = new THREE.MeshPhongMaterial({color: 0x33FFD7});
    
    // Ya podemos construir el Mesh
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cylinder);
  }
  
  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.radiusTop = 0.5;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radiusTop = 0.5;
      }
    } 
    
    var that = this;
    // Se crea una sección para los controles del cilindro
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radiusTop', 0.5, 5.0, 0.1).name ('Radio Superior : ').listen()
    .onChange(function(radiusTop){
      var cylinderGeom = new THREE.CylinderGeometry(that.guiControls.radiusTop,0.5,1,10);
      that.cylinder.geometry = cylinderGeom;
    });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }
}

export { MyCylinder };
