import * as THREE from '../libs/three.module.js'

class ExamenT extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var  material = new THREE.MeshNormalMaterial;

    //Pieza A
    this.piezaAGeometry = new THREE.BoxBufferGeometry(3,7,1);
    this.piezaAGeometry.translate(0,0.5,0);
    this.piezaA = new THREE.Mesh(this.piezaAGeometry,material);

    //Pieza B
    this.piezaBGeometry = new THREE.BoxBufferGeometry(0.8,4,0.4);
    this.piezaB = new THREE.Mesh(this.piezaBGeometry,material);

    //Pieza C
    this.piezaCGeometry = new THREE.CylinderBufferGeometry(0.2,0.2,3);
    this.piezaCGeometry.translate(0,1.5,0);
    this.piezaC = new THREE.Mesh(this.piezaCGeometry,material);
    this.piezaC.rotation.x = Math.PI/2;

    //Pieza BC
    this.piezaBC = new THREE.Object3D();
    this.piezaBC.add(this.piezaB);
    this.piezaC.position.y = -1.5;
    this.piezaC.name = 'Cilindro';
    this.piezaBC.add(this.piezaC);
    this.piezaBC.position.y = -1.25;

    //Pieza D
    this.piezaDGeometry = new THREE.SphereBufferGeometry(0.1);
    this.piezaD = new THREE.Mesh(this.piezaDGeometry,material);
    this.piezaD.position.z = 0.2;
    
    //Pieza BCD
    this.piezaBCD1 = new THREE.Object3D();
    this.piezaBCD1.add(this.piezaBC);
    this.piezaBCD1.add(this.piezaD);

    this.piezaBCD2 = this.piezaBCD1.clone();

    //Pieza ABCD
    this.piezaABCD = new THREE.Object3D();
    this.piezaABCD.add(this.piezaA);
    this.piezaABCD.add(this.piezaBCD1);
    this.piezaABCD.add(this.piezaBCD2);

   this.add(this.piezaABCD);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.altura_escala = 1;
      this.rotacionBC = 0;
      this.altura_piezaBCD = 0;
        
    }

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls,'altura_escala',1,2,0.1).name('Longitud: ');
    folder.add(this.guiControls,'rotacionBC',-0.5,0.5,0.01).name('Rotacion: ');
    folder.add(this.guiControls,'altura_piezaBCD',0,2.5,0.01).name('ALtura: ');
  }

  update(){
    this.piezaC.scale.set(1,this.guiControls.altura_escala,1);
    this.piezaBCD2.getObjectByName('Cilindro').scale.set(1,this.guiControls.altura_escala,1);
    this.piezaBCD1.rotation.set(0,0,-this.guiControls.rotacionBC);
    this.piezaBCD2.rotation.set(0,0,this.guiControls.rotacionBC);
    this.piezaBCD1.position.set(-1.2,this.guiControls.altura_piezaBCD,0.5);
    this.piezaBCD2.position.set(1.2,this.guiControls.altura_piezaBCD,0.5);
  }
}

export { ExamenT };