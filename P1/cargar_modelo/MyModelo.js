import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class MyModelo extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        var that = this;
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load('./Cat/12221_Cat_v1_l3.mtl',
            function(materials){
                objectLoader.setMaterials(materials);
                objectLoader.load('./Cat/12221_Cat_v1_l3.obj',
                function(object){
                    var modelo = object;
                    that.add(modelo);
                },null,null);
        });
    
    }

    createGUI (gui,titleGui) {
    }

    update(){ 
    }

}


export { MyModelo };