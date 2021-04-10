import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from "../libs/ThreeBSP.js"
 
class MyCup extends THREE.Object3D {
  constructor() {
    super();
  
    var cylinderGeom = new THREE.CylinderGeometry( 1, 1,3,15);
    var cylinderGeom2 = new THREE.CylinderGeometry( 0.75, 1,3,15);
    var torusGeom = new THREE.TorusGeometry(0.5);

    cylinderGeom2.translate(0,0.5,0);
    torusGeom.translate(1,0.5,0);


    var cilindro_externo = new ThreeBSP(cylinderGeom);
    var cilindro_interno = new ThreeBSP(cylinderGeom2);
    var torus = new ThreeBSP(torusGeom);

    var asa = torus.subtract(cilindro_interno);

    var substract = cilindro_externo.subtract(cilindro_interno);
    var result = substract.union(asa);

    var geometry = result.toGeometry();
    var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);

    var cupMat = new THREE.MeshNormalMaterial;
    cupMat.flatShading = true;
    cupMat.needsUpdate = true;

    var cup = new THREE.Mesh (bufferGeometry, cupMat);

    this.add (cup);
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

export { MyCup };
