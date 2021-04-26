import * as THREE from '../libs/three.module.js'
 
class LinePawn extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    this.points = [];
    this.setPoints();

    var pawnMat = new THREE.MeshNormalMaterial();
    var pawnGeo = new THREE.LatheGeometry(this.points,this.guiControls.resolution,0,this.guiControls.angle);
    this.pawn = new THREE.Mesh(pawnGeo,pawnMat);
  
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.pawn);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.resolution = 3;
      this.angle = 2*Math.PI;
    } 
    
    var that = this;

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'resolution', 1, 10, 1).name ('Resolución : ').listen()
    .onChange(function(value){that.changeGeometry();});
    folder.add (this.guiControls, 'angle', 0, 2*Math.PI, Math.PI/4).name ('Ángulo : ').listen()
    .onChange(function(value){that.changeGeometry();});

  }
  
  update () {

  }

  changeGeometry(){
    var newGeometry = new THREE.LatheGeometry(this.points,this.guiControls.resolution,0,this.guiControls.angle);
    this.pawn.geometry = newGeometry;
  }

  setPoints(){
     this.points.push(new THREE.Vector3(1.0, -1.4, 0.0));
     this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
     this.points.push(new THREE.Vector3(0.5, -0.7 ,0.0));
     this.points.push(new THREE.Vector3(0.4, -0.4, 0.0));
     this.points.push(new THREE.Vector3(0.4, 0.5, 0.0));
     this.points.push(new THREE.Vector3(0.5, 0.6, 0.0));
     this.points.push(new THREE.Vector3(0.3, 0.6, 0.0));
     this.points.push(new THREE.Vector3(0.5, 0.8 ,0.0));
     this.points.push(new THREE.Vector3(0.55, 1.0, 0.0));
     this.points.push(new THREE.Vector3(0.5, 1.2, 0.0));
     this.points.push(new THREE.Vector3(0.3, 1.4, 0.0));
  }
}

export { LinePawn };
