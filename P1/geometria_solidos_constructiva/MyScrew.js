import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from "../libs/ThreeBSP.js"
 
class MyScrew extends THREE.Object3D {
  constructor() {
    super();
    
    var shape = new THREE.Shape();
    shape.moveTo(1,0);
    shape.quadraticCurveTo(1.5,0,1.5,0.3);

    shape.lineTo(2,1);
    shape.quadraticCurveTo(2.3,1,2.3,1.5)
 
    
    var options = {steps: 2,
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 1};
    var heartGeom = new THREE.ExtrudeBufferGeometry(shape,options);
    var heartMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    var clover = new THREE.Mesh (heartGeom, heartMat);

    this.add (clover);
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

export { MyScrew };
