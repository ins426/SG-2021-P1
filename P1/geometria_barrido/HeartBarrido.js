import * as THREE from '../libs/three.module.js'
 
class HeartBarrido extends THREE.Object3D {
  constructor() {
    super();
    
    var heartShape = this.createHeartShape();
    var recorrido = [];

    recorrido.push(new THREE.Vector3(0,0,0));
    recorrido.push(new THREE.Vector3(2,5,2));
    recorrido.push(new THREE.Vector3(-2,10,-2));
    recorrido.push(new THREE.Vector3(2,15,2));

    var curva = new THREE.CatmullRomCurve3(recorrido);
    var options = {curveSegments: 30, steps: 20, extrudePath: curva, 
        depth: 1, bevelEnabled: true, 
        bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}
    
    var heartGeom = new THREE.ExtrudeBufferGeometry(heartShape,options);
    var heartMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    var heart = new THREE.Mesh (heartGeom, heartMat);

    this.add (heart);
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }

  createHeartShape(){
    var shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.quadraticCurveTo(0.75,0.75,0.75,1.25);
    shape.bezierCurveTo(0.75,1.75,0,1.75,0,1.25);
    shape.bezierCurveTo(0,1.75,-0.75,1.75,-0.75,1.25);
    shape.quadraticCurveTo(-0.75,0.75,0,0);

    return shape;
  }
}

export { HeartBarrido };
