import * as THREE from '../libs/three.module.js'
 
class MyClover extends THREE.Object3D {
  constructor() {
    super();
    
    var shape = new THREE.Shape();
    shape.moveTo(0,3);
    shape.bezierCurveTo(-1,3,-1,2.25,-0.5,2);
    shape.bezierCurveTo(-1.25,1.75,-0.75,0.6,-0.1,1);
    shape.lineTo(-0.1,0.5);
    shape.quadraticCurveTo(-0.05,0.25,-0.5,0);
    shape.lineTo(0.5,0);
    shape.quadraticCurveTo(0.05,0.25,0.1,0.5);
    shape.lineTo(0.1,1);
    shape.bezierCurveTo(0.75,0.6,1.5,1.75,0.5,2);
    shape.bezierCurveTo(1,2,1,3,0,3);
 
    
    var options = {steps: 2,
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.25,
      bevelOffset: 0,
      bevelSegments: 1};
    var cloverGeom = new THREE.ExtrudeBufferGeometry(shape,options);
    var cloverMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    var clover = new THREE.Mesh (cloverGeom, cloverMat);

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

export { MyClover };
