import * as THREE from '../libs/three.module.js'
 
class MyHeart extends THREE.Object3D {
  constructor() {
    super();
    
    var shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.quadraticCurveTo(0.75,0.75,0.75,1.25);
    shape.bezierCurveTo(0.75,1.75,0,1.75,0,1.25);
    shape.bezierCurveTo(0,1.75,-0.75,1.75,-0.75,1.25);
    shape.quadraticCurveTo(-0.75,0.75,0,0);
 
    
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

export { MyHeart };
