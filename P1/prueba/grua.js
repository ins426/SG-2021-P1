import * as THREE from '../libs/three.module.js'

class Grua extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var  material = new THREE.MeshNormalMaterial;

    //Barra
    var barraGeometry = new THREE.CylinderBufferGeometry(0.5,0.5,10);
    this.barra = new THREE.Mesh(barraGeometry,material);
    this.barra.position.y = 5;

    //Base
    var baseGeometry = new THREE.CylinderBufferGeometry(2,2,0.1,32,32);
    this.base = new THREE.Mesh(baseGeometry,material);

    //Barra-Base
    var barra_base = new THREE.Object3D();
    barra_base.add(this.barra);
    barra_base.add(this.base);
    barra_base.position.y = -10;

    //Brazo
    var brazoGeometry = new THREE.BoxBufferGeometry(0.5,10,0.5);
    brazoGeometry.rotateX(Math.PI/2);
    brazoGeometry.translate(0,0.4,4);

    var brazo = new THREE.Mesh(brazoGeometry,material);

    //*******************PLUMA*********************/

    //Brazo pequeño
    var brazopequenioGeometry = new THREE.CylinderBufferGeometry(0.1,0.1,4);
    brazopequenioGeometry.translate(0,-2,0);
    this.brazo_pequenio = new THREE.Mesh(brazopequenioGeometry,material);

    //Iman
    var imanGeometry = new THREE.CylinderBufferGeometry(0.5,0.5,0.05);
    this.iman = new THREE.Mesh(imanGeometry,material);

    //Brazo pequeño-Iman
    var brazo_pequenio_iman = new THREE.Object3D();
    brazo_pequenio_iman.add(this.brazo_pequenio);
    brazo_pequenio_iman.add(this.iman);

    //Caja
    var cajaGeometry = new THREE.BoxBufferGeometry(1,0.3,1);
    this.caja = new THREE.Mesh(cajaGeometry,material);

    //Pluma
    this.pluma = new THREE.Object3D();
    this.pluma.add(brazo_pequenio_iman);
    this.pluma.add(this.caja);
    //************************************************** */
    //****************GRÚA***************************** */
    this.brazo_completo = new THREE.Object3D();
    this.brazo_completo.add(this.pluma);
    this.brazo_completo.add(brazo);

    this.grua = new THREE.Object3D();

    this.grua.add(this.brazo_completo);
    this.grua.add(barra_base);

    this.add(this.grua);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.escala_brazo = 1;  
      this.pos_pluma = 7;  
      this.rotacion = 0;
    }

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls,'escala_brazo',1,2,0.1).name('Longitud: ');
    folder.add(this.guiControls,'pos_pluma',2,7,0.1).name('Posición pluma: ');
    folder.add(this.guiControls,'rotacion',0,7,0.1).name('Rotacion: ');
  }

  update(){
    this.brazo_pequenio.scale.set(1,this.guiControls.escala_brazo,1);
    this.iman.position.y = (-0.025-4)*this.guiControls.escala_brazo;
    this.pluma.position.z = this.guiControls.pos_pluma;
    this.grua.rotation.y = this.guiControls.rotacion;

  }
}

export { Grua };