import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js';

class MyClock extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var material1 = new THREE.MeshPhongMaterial({color: 0xCF0000});
    var material2 = new THREE.MeshPhongMaterial({color: 0x0000ff});
    var forma = new THREE.SphereGeometry(15,12,1);

    this.tiempoAnterior = Date.now();

    var aguja = this.createSemiesfera();
    this.aguja = new THREE.Mesh(aguja,material2);
    this.aguja.position.set(forma.vertices[12].x+1.5,forma.vertices[12].y,forma.vertices[12].z+1.5);
    this.minutero = new THREE.Object3D();
    this.minutero.add(this.aguja);

    this.add(this.minutero);
    
    var s1 = this.createSemiesfera();
    var minutero1 = new THREE.Mesh(s1,material1);
    minutero1.position.set(forma.vertices[1].x,forma.vertices[1].y,forma.vertices[1].z);
    this.add(minutero1);

    var s2 = this.createSemiesfera();
    var minutero2 = new THREE.Mesh(s2,material1);
    minutero2.position.set(forma.vertices[2].x,forma.vertices[2].y,forma.vertices[2].z);
    this.add(minutero2);

    var s3 = this.createSemiesfera();
    var minutero3 = new THREE.Mesh(s3,material1);
    minutero3.position.set(forma.vertices[3].x,forma.vertices[3].y,forma.vertices[3].z);
    this.add(minutero3);

    var s4 = this.createSemiesfera();
    var minutero4 = new THREE.Mesh(s4,material1);
    minutero4.position.set(forma.vertices[4].x,forma.vertices[4].y,forma.vertices[4].z);
    this.add(minutero4);

    var s5 = this.createSemiesfera();
    var minutero5 = new THREE.Mesh(s5,material1);
    minutero5.position.set(forma.vertices[5].x,forma.vertices[5].y,forma.vertices[5].z);
    this.add(minutero5);

    var s6 = this.createSemiesfera();
    var minutero6 = new THREE.Mesh(s6,material1);
    minutero6.position.set(forma.vertices[6].x,forma.vertices[6].y,forma.vertices[6].z);
    this.add(minutero6);

    var s7 = this.createSemiesfera();
    var minutero7 = new THREE.Mesh(s7,material1);
    minutero7.position.set(forma.vertices[7].x,forma.vertices[7].y,forma.vertices[7].z);
    this.add(minutero7);

    var s8 = this.createSemiesfera();
    var minutero8 = new THREE.Mesh(s8,material1);
    minutero8.position.set(forma.vertices[8].x,forma.vertices[8].y,forma.vertices[8].z);
    this.add(minutero8);

    var s9 = this.createSemiesfera();
    var minutero9 = new THREE.Mesh(s9,material1);
    minutero9.position.set(forma.vertices[9].x,forma.vertices[9].y,forma.vertices[9].z);
    this.add(minutero9);

    var s10 = this.createSemiesfera();
    var minutero10 = new THREE.Mesh(s10,material1);
    minutero10.position.set(forma.vertices[10].x,forma.vertices[10].y,forma.vertices[10].z);
    this.add(minutero10);
    
    var s11 = this.createSemiesfera();
    var minutero11 = new THREE.Mesh(s11,material1);
    minutero11.position.set(forma.vertices[11].x,forma.vertices[11].y,forma.vertices[11].z);
    this.add(minutero11);

    var s12 = this.createSemiesfera();
    var minutero12 = new THREE.Mesh(s12,material1);
    minutero12.position.set(forma.vertices[12].x,forma.vertices[12].y,forma.vertices[12].z);
    this.add(minutero12);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
        this.velocidad = 1;
    }

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls,'velocidad',-12,12,1).name('Velocidad(marcas/s)').listen();
  }

  createSemiesfera(){
    var esferaGeom = new THREE.SphereGeometry(1,20);
    var cilindroGeom = new THREE.CylinderGeometry(2,2,2,20);
    cilindroGeom.translate(0,-1,0);

    var esfera = new ThreeBSP(esferaGeom);
    var cilindro = new ThreeBSP(cilindroGeom);

    var resultado = esfera.subtract(cilindro);
    var geometry = resultado.toGeometry();
    var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);

    return bufferGeometry;

  }

  update(){
    var tiempoActual = Date.now();
    var segundos = (tiempoActual-this.tiempoAnterior)/1000;
    this.minutero.rotation.y += segundos * this.guiControls.velocidad;
    this.tiempoAnterior = tiempoActual;
  }
}

export { MyClock };