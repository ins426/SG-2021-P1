import * as THREE from '../libs/three.module.js'
import * as TWEEN from "../libs/tween.esm.js"

class Pelota extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var esfera = new THREE.SphereBufferGeometry(1,32,32);
    var  material = new THREE.MeshNormalMaterial;

    this.pelota = new THREE.Mesh(esfera,material);

    var that = this;
    var origen1 = {p:0, y:0,escala:1};
    var destino1 = {p:0.25, y:3,escala:1.1};

    var escena1 = new TWEEN.Tween(origen1).to(destino1,400).onUpdate(()=>{
        that.pelota.position.y = origen1.y;
        that.pelota.scale.set(1,origen1.escala,1);
    });

    var origen2 = {p:0.25, y:3,escala:1.1};
    var destino2 = {p:0.5, y:5,escala:1};

    var escena2 = new TWEEN.Tween(origen2).to(destino2,700).easing(TWEEN.Easing.Quadratic.Out).onUpdate(()=>{
        that.pelota.position.y = origen2.y;
        that.pelota.scale.set(1,origen2.escala,1);
    });

    var origen3 = {p:0.5, y:5,escala:1};
    var destino3 = {p:0.75, y:0.2,escala:1.1};

    var escena3 = new TWEEN.Tween(origen3).to(destino3,700).easing(TWEEN.Easing.Quadratic.In).onUpdate(()=>{
        that.pelota.position.y = origen3.y;
        that.pelota.scale.set(1,origen3.escala,1);
    });

    var origen4 = {p:0.75, y:0.2,escala:1};
    var destino4 = {p:0.1, y:0,escala:0.9};

    var escena4 = new TWEEN.Tween(origen4).to(destino4,80).easing(TWEEN.Easing.Quadratic.Out).onUpdate(()=>{
        that.pelota.scale.set(1,origen4.escala,1);
    }).onComplete(()=>{escena1.start();});

    escena3.chain(escena4);
    escena2.chain(escena3);
    escena1.chain(escena2);

    this.add(this.pelota);
    escena1.start();
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      
        
    }

    var folder = gui.addFolder(titleGui);
    //folder.add(this.guiControls,'altura_escala',1,2,0.1).name('Longitud: ');
  }

  update(){
    TWEEN.update();
  }
}

export { Pelota };