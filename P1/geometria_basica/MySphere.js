import * as THREE from '../libs/three.module.js'
 
class MySphere extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde al cilindro
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var sphereGeom = new THREE.SphereGeometry( this.guiControls.radius,this.guiControls.res_ecuador,this.guiControls.res_meridian);
    var sphereMat = new THREE.MeshNormalMaterial;
    sphereMat.flatShading = true;
    sphereMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.sphere);
  }
  
  createGUI (gui,titleGui) {
    // Controles para la modificación de la geometría del cilindro
    this.guiControls = new function () {
      this.radius = 1;
      this.res_ecuador = 3;
      this.res_meridian = 2;
    } 
    
    var that = this;
    // Se crea una sección para los controles del cilindro
    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radius', 1, 5.0, 0.1).name ('Radio : ').listen();

    folder.add(this.guiControls,'res_ecuador',3,20,1).name('Res. Ecuador: ').listen()
    .onChange(function(res_ecuador){that.changeGeometry(); });

    folder.add(this.guiControls,'res_meridian',2,20,1).name('Res. Meridiano: ').listen()
    .onChange(function(res_meridian){that.changeGeometry(); });
  }
  
  update () {
    this.scale.set(this.guiControls.radius,this.guiControls.radius, this.guiControls.radius);
    this.sphere.rotation.z += 0.02;
    this.sphere.rotation.y += 0.02;
  }

  changeGeometry(){
    var sphereGeom = new THREE.SphereGeometry(this.guiControls.radius,this.guiControls.res_ecuador,this.guiControls.res_meridian);
    this.sphere.geometry = sphereGeom;
  }
}

export { MySphere };
