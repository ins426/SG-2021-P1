import * as THREE from '../libs/three.module.js'
 
class LinePawn extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    this.points = [];
    this.setPoints();

    var pawnMat = new THREE.MeshPhongMaterial({color: 0x33DDFF });
    pawnMat.flatShading = true;
    pawnMat.needsUpdate = true;

    this.pawnGeometry = new THREE.Mesh(new THREE.LatheGeometry(this.points),pawnMat);
    
    this.pawnLineGeometry = new THREE.Geometry();
    this.pawnLineGeometry.vertices = this.points;
    
    this.pawn = new THREE.Line(this.pawnLineGeometry, pawnMat);

    
    this.pawn.position.y = (this.points[this.points.length-1].getComponent(1)-this.points[0].getComponent(1))/2;
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.pawn);
  }

  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.resolution = 3;
      this.angle = 1.0;
    } 
    

  }
  
  update () {

  }

  setPoints(){
     this.points.push(new THREE.Vector3(1.0, -1.4, 0.0)); 
     this.points.push(new THREE.Vector3(1.0, -1.1 ,0.0)); 
     this.points.push(new THREE.Vector3(0.5 ,-0.7, 0.0)); 
     this.points.push(new THREE.Vector3(0.4 ,-0.4 ,0.0)); 
     this.points.push(new THREE.Vector3(0.4, 0.5, 0.0)); 
     this.points.push(new THREE.Vector3(0.5, 0.6 ,0.0)); 
     this.points.push(new THREE.Vector3(0.3, 0.6, 0.0)); 
     this.points.push(new THREE.Vector3(0.5, 0.8, 0.0)); 
     this.points.push(new THREE.Vector3(0.55, 1.0, 0.0)); 
     this.points.push(new THREE.Vector3(0.5 ,1.2 ,0.0)); 
     this.points.push(new THREE.Vector3(0.3 ,1.4, 0.0)); 
  }
}

export { LinePawn };
