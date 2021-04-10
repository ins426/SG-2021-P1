import * as THREE from '../libs/three.module.js'
 
class MySpade extends THREE.Object3D {
  constructor() {
    super();

    var shape = new THREE.Shape();
    shape.moveTo(0,3);
    shape.lineTo(-1.5,1.5);
    shape.quadraticCurveTo(-2,1,-1.5,0.5);
    shape.quadraticCurveTo(-0.75,0,0,0.5);
    shape.quadraticCurveTo(0,0.25,-0.5,0);
    shape.lineTo(0.5,0);
    shape.quadraticCurveTo(0,0.25,0,0.5);
    shape.quadraticCurveTo(0.75,0,1.5,0.5);
    shape.quadraticCurveTo(2,1,1.5,1.5);
    shape.lineTo(0,3);
 
    
    var options = {steps: 2,
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 1};
    var diamondGeom = new THREE.ExtrudeBufferGeometry(shape,options);
    var diamondMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    var diamond = new THREE.Mesh (diamondGeom, diamondMat);

    this.add (diamond);
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

export { MySpade };
