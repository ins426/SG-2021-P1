import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from "../libs/ThreeBSP.js"
 
class MyTriangle extends THREE.Object3D {
  constructor() {
    super();
    var material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    material.needsUpdate = true;

    var triangleGeom = this.createTriangle();
    var coneGeom = new THREE.CylinderGeometry(0.1,0.1,4,10);

    coneGeom.translate(2,0,0.5);

    var A = new ThreeBSP(triangleGeom);
    var B = new ThreeBSP(coneGeom);

    var result = A.subtract(B);

    coneGeom.rotateZ(Math.PI/2);
    coneGeom.translate(0,0.5,0);
    var C = new ThreeBSP(coneGeom);

    var final = result.subtract(C);

    this.escuadra = final.toMesh(material);
   

    this.add(this.escuadra);
  }

  
  update () {
  }

  createTriangle(){
    var shape = new THREE.Shape();
    shape.moveTo(0,3);
    shape.lineTo(-0.5,3);
    shape.lineTo(-0.5,0);
    shape.lineTo(2.5,0);
    shape.lineTo(2.5,0.5);
    shape.lineTo(0.5,0.5);
    shape.quadraticCurveTo(0.1,0.5,0.1,1);
    shape.lineTo(0.1,3);
    shape.lineTo(0,3);
 
    
    var options = {curveSegments: 15, steps: 1, depth: 1, bevelEnabled: false};

    return new THREE.ExtrudeGeometry(shape,options);
  }
}

export { MyTriangle};
