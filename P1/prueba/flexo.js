import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js';

class Flexo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var cono = new THREE.ConeBufferGeometry(1,1);
    var cilindro = new THREE.CylinderBufferGeometry(0.1,0.1,2.5);

    var material1 = new THREE.MeshPhongMaterial({color: 0xCF0000});
    var material2 = new THREE.MeshPhongMaterial({color: 0x0000ff});

    this.cabeza = new THREE.Mesh(cono,material1);
    this.brazo = new THREE.Mesh(cilindro,material2);

    this.cabeza.position.x = 1.25;
    this.brazo.rotation.z = Math.PI/2;

    this.resultado = new THREE.Object3D();
    this.resultado.add(this.cabeza);
    this.resultado.add(this.brazo);

    this.add(this.resultado);
    
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
        
    }

    // var folder = gui.addFolder(titleGui);
    // folder.add(this.guiControls,'velocidad',-12,12,1).name('Velocidad(marcas/s)').listen();
  }

  update(){
    this.resultado.rotation.x += 0.01;
  }
}

export { Flexo };