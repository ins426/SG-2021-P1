import * as THREE from '../libs/three.module.js'
import * as TWEEN from "../libs/tween.esm.js"
 
class MyRecorrido extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    this.createGUI(gui,titleGui);

    var geometria = new THREE.ConeGeometry(0.5,0.8,3);
    var textura = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    this.nave_girada = new THREE.Mesh(geometria,material);
    this.nave = new THREE.Object3D();

    this.nave_girada.rotation.x = Math.PI/2;
    
    var recorrido = [new THREE.Vector3(0,0,0), new THREE.Vector3(-0.5,1.25,0), new THREE.Vector3(-1.25,-0.5,1.25),
                    new THREE.Vector3(0,0,0),new THREE.Vector3(3,1,-2.5),new THREE.Vector3(1,-1.25,1.25),
                    new THREE.Vector3(0,0,0)];
    
    this.curva = new THREE.CatmullRomCurve3(recorrido);

    var puntos = this.curva.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints(puntos);

    var material1 = new THREE.LineBasicMaterial({color: 0x000000});
    var spline = new THREE.Line(geometry,material1);

    this.nave.add(this.nave_girada);
    this.add(this.nave);
    this.add(spline);

    //Bucle rápido: 4 segundos
    var origen1 = {p: 0}
    var destino1 = {p:0.5}   //0.5 porque es la mitad

    var bucle_rapido = new TWEEN.Tween(origen1).to(destino1,4000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen1.p);
        this.nave.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen1.p);
        pos.add(tangente);

        this.nave.lookAt(pos);
    });

    //Bucle lento: 8 segundos
    var origen2 = {p: 0.5};
    var destino2 = {p: 1};
    
    var bucle_lento = new TWEEN.Tween(origen2).to(destino2,8000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen2.p);
        this.nave.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen2.p);
        pos.add(tangente);

        this.nave.lookAt(pos);
    }).onComplete(()=>{bucle_rapido.start();});

    bucle_rapido.chain(bucle_lento);
    bucle_rapido.start();
  }

    createGUI (gui,titleGui) {
        this.guiControls = new function (){
        }
 
   
    }

    update(){
      TWEEN.update();  
    }
}

export { MyRecorrido };