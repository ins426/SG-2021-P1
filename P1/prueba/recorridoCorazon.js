import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from "../libs/ThreeBSP.js"
import * as TWEEN from "../libs/tween.esm.js"

class recorridoCorazon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var  material = new THREE.MeshNormalMaterial;
    var material_linea = new THREE.LineBasicMaterial({color: 0x000000});

    //Creación del shape del corazón
    var shape = new THREE.Shape();
    shape.moveTo(0,2);
    shape.quadraticCurveTo(-1,2.5,-1.5,2);
    shape.quadraticCurveTo(-2.2,1.2,-2,1);
    shape.lineTo(0,0);
    shape.lineTo(2,1);
    shape.quadraticCurveTo(2.2,1.2,1.5,2);
    shape.quadraticCurveTo(1,2.5,0,2);

    var geometry = new THREE.ShapeGeometry(shape);
    var recorrido = geometry.vertices;
    this.curve = new THREE.CatmullRomCurve3(recorrido);

    var puntos = this.curve.getPoints(100);
    var forma = new THREE.BufferGeometry().setFromPoints(puntos);
    var spline = new THREE.Line(forma,material_linea);

    //Creación de la punta del lápiz
    var cajaGeometry = new THREE.BoxGeometry(0.2,0.2,0.2);
    var conoGeometry = new THREE.ConeGeometry(0.2,0.2);

    var A = new ThreeBSP(cajaGeometry);
    var B = new ThreeBSP(conoGeometry);
    var resultado1 = A.intersect(B);

    var geometry = resultado1.toGeometry();
    var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
    this.final = new THREE.Mesh(bufferGeometry,material);

    this.final.rotation.x =  Math.PI/2;

    var origen = {p:0};
    var destino = {p:1};

    var that = this;
    var animacion = new TWEEN.Tween(origen).to(destino,10000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = that.curve.getPointAt(origen.p);
        that.final.position.copy(pos);
        
        var tangente = that.curve.getTangentAt(origen.p);
        pos.add(tangente);

        that.final.lookAt(pos);
    }).repeat(Infinity);

    this.add(spline);
    this.add(this.final);

    animacion.start();
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

export { recorridoCorazon };