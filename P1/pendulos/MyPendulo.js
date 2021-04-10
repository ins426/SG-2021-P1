import * as THREE from '../libs/three.module.js'
 
class MyPendulo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    //Creamos la interfaz que corresponde a la grapadora
    this.createGUI(gui,titleGui);

    this.pendulo1 = this.createPendulo1();
    this.pendulo2 = this.createPendulo2();

    this.add(this.pendulo1);
  }

  createPendulo1(){
    var pendulo1 = new THREE.Object3D();

    //Partes del péndulo 1
    var caja1 = new THREE.BoxGeometry(3,4,1);
    this.longitud1 = 5;
    caja1.translate(0,-2,0);
    var caja2 = new THREE.BoxGeometry(3,this.longitud1,1);
    caja2.translate(0,-2.5,0);
    var caja3 = new THREE.BoxGeometry(3,4,1);

    var material_verde = new THREE.MeshPhongMaterial({color: 0x00FF00 });
    var material_rojo = new THREE.MeshPhongMaterial({color: 0xCF0000 });
    
    var extremo_superior = new THREE.Mesh(caja3,material_verde);
    this.extremo_inferior = new THREE.Mesh(caja1,material_verde);
    this.parte_central = new THREE.Mesh(caja2,material_rojo);

    //Parte central+inferior
    var parte_central_inferior = new THREE.Object3D();
    parte_central_inferior.add(this.parte_central);
    parte_central_inferior.add(this.extremo_inferior);

    // //Pendulo completo, sin eje
    var pendulo = new THREE.Object3D();
    parte_central_inferior.position.y = -2;
    pendulo.add(extremo_superior);
    pendulo.add(parte_central_inferior);

    // //Eje del péndulo 1;
    var octogono = new THREE.CylinderGeometry(1,1,0.5,8);
    octogono.rotateX(Math.PI/2 );
    octogono.translate(0,0,0.5);
    var material_cyan =  new THREE.MeshPhongMaterial({color: 0x00ffff });
    var eje =  new THREE.Mesh(octogono,material_cyan);

    // //Péndulo completo, con eje
    pendulo1.add(pendulo);
    pendulo1.add(eje);

    return pendulo1;

  }

  //Creación del segundo péndulo
  createPendulo2(){
    var pendulo2 = new THREE.Object3D();

    //Péndulo 2
    this.longitud2 = 10;
    var pendulo = new THREE.BoxGeometry(2,this.longitud2,1);
    pendulo.translate(0,-5,0);
    var material1 =  new THREE.MeshPhongMaterial({color: 0x0000ff });
    this.pendulo = new THREE.Mesh(pendulo,material1);

    //Eje del péndulo 2
    var octogono = new THREE.CylinderGeometry(1,1,0.5,8);
    var material2 =  new THREE.MeshPhongMaterial({color: 0xCF0000 });
    var eje =  new THREE.Mesh(octogono,material2);

    eje.rotation.x = Math.PI/2 ;
    eje.position.y = -2.5;
    eje.position.z = 0.75;
  
    pendulo2.add(this.pendulo);
    pendulo2.add(eje);

    return pendulo2;
  }

  createGUI (gui,titleGui) {
   this.guiControls = new function (){
       this.rotacionP1 = 0;
       this.tamanioP1 = 5;
       this.rotacionP2 = 0;
       this.tamanioP2 = 10;
   }

  //Controles péndulo 1
  var folder1 = gui.addFolder('Primer péndulo');
  folder1.add(this.guiControls,'rotacionP1',-0.8,0.8,0.1).name("Giro: ");
  folder1.add(this.guiControls,'tamanioP1',5,10,1).name("Longitud: ");

   //Controles péndulo 2
   var folder2 = gui.addFolder('Segundo péndulo ');
   folder2.add(this.guiControls,'rotacionP2',-0.8,0.8,0.1).name("Giro: ");
   folder2.add(this.guiControls,'tamanioP2',10,20,1).name("Longitud: ");
  }

  update(){
      this.pendulo2.rotation.z = this.guiControls.rotacionP2;
      this.pendulo.scale.y = this.guiControls.tamanioP2/this.longitud2;

      this.pendulo1.rotation.z = this.guiControls.rotacionP1;
      this.parte_central.scale.y = this.guiControls.tamanioP1/this.longitud1;

      this.extremo_inferior.position.y = -5*(this.guiControls.tamanioP1/this.longitud1);
  }
}

export { MyPendulo };