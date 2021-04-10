import * as THREE from '../libs/three.module.js'
 
class MyDiamond extends THREE.Object3D {
  constructor() {
    super();
  
    var shape = new THREE.Shape();
    shape.moveTo(0,3);
    shape.lineTo(-2,0);
    shape.lineTo(0,-3);
    shape.lineTo(2,0);
    
    var options = {steps: 2,
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 1};
    var diamondGeom = new THREE.ExtrudeBufferGeometry(shape, options);
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

export { MyDiamond };
