import * as THREE from '../libs/three.module.js'
import * as TWEEN from "../libs/tween.esm.js"
 
class MySaltarina extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);

        //Creación materiales
        var material = new THREE.MeshNormalMaterial({transparent:true, opacity:0.5});
        var material1 = new THREE.LineBasicMaterial({color: 0x000000});
        var material2 = new THREE.MeshNormalMaterial;

        //Creación elipse
        this.shape = new THREE.Shape();
        this.shape.absellipse(0,0,this.guiControls.radio,this.guiControls.radio,0,Math.PI*2);
        this.geometry = new THREE.ShapeGeometry(this.shape);
        this.geometry.rotateX(Math.PI/2);

        //Creación esfera
        var geometryEsfera = new THREE.SphereGeometry(0.5,32,32);
        this.esfera = new THREE.Mesh(geometryEsfera,material2);
        this.esfera.position.y = 2.5-0.25;
        this.esfera.position.z = this.guiControls.posEsferaZ;

        //Creación cilindro
        var altura = 2;
        var geometryCilindro = new THREE.CylinderGeometry(this.guiControls.radio,this.guiControls.radio,altura,32,32);
        this.cilindro = new THREE.Mesh(geometryCilindro,material);
        this.cilindro.position.y = altura/2;


        //Animación
        var recorrido = this.geometry.vertices;
        this.curve = new THREE.CatmullRomCurve3(recorrido);

        var puntos = this.curve.getPoints(100);
        var geometry2 = new THREE.BufferGeometry().setFromPoints(puntos);
        var spline = new THREE.Line(geometry2,material1);

        var origen1 = {p:0, x:this.guiControls.radio};
        var destino1 = { p:1,x:this.guiControls.radio};

        var that = this;

        this.antiguo_radio = this.guiControls.radio;

        var origen2 = {y:0};
        var destino2 = { y:altura};

        var salta =  new TWEEN.Tween(origen2).to(destino2,500).easing(TWEEN.Easing.Quadratic.Out).repeat(Infinity).yoyo(true);
        
        var helicoide = new TWEEN.Tween(origen1).to(destino1,2000).onUpdate(()=>{

            if(that.antiguo_radio != that.guiControls.radio){
                var mi_shape = new THREE.Shape();
                mi_shape.absellipse(0,0,that.guiControls.radio,that.guiControls.radio,0,Math.PI*2);
                that.geometry = new THREE.ShapeGeometry(mi_shape);
                that.geometry.rotateX(Math.PI/2);
                that.shape = mi_shape;

                var recorrido = that.geometry.vertices;
                that.curve = new THREE.CatmullRomCurve3(recorrido);

                that.antiguo_radio = that.guiControls.radio;
            }
            var pos = that.curve.getPointAt(origen1.p);
            that.esfera.position.copy(pos);
            that.esfera.position.y = origen2.y;
            
        }).repeat(Infinity);
        
        this.add(this.esfera);
        this.add(this.cilindro);
        this.add(spline);

        salta.start();
        helicoide.start();
    }

    createGUI (gui,titleGui) {
        this.guiControls = new function (){
            this.radio = 1;
            this.posEsferaZ = 0.25;
        }

        var folder = gui.addFolder("Cilindro");
        folder.add(this.guiControls,'radio',1,30,0.1).name("Radio: ");
    }

    update(){
        this.cilindro.scale.set(this.guiControls.radio,1,this.guiControls.radio);
        TWEEN.update();
    }
}

export { MySaltarina };