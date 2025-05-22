import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import Gsap from "../gsap/HoldGsap";
import OBModel from "../3DModels/Crystal.glb";


function Threejs(Object) {
    let {MoveObject}=Gsap()
    const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          Object.current.offsetWidth / Object.current.offsetHeight,
          0.1,
          1000
        );
        camera.position.z = 0.80;
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(Object.current.offsetWidth, Object.current.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        Object.current.appendChild(renderer.domElement);
        const light = new THREE.DirectionalLight(0x66f1de, 5);
        light.position.set(0, 0, 0.6);
        scene.add(light);
        const loader = new GLTFLoader();
        loader.load(
          OBModel,
          function (gltf) {
            const model = gltf.scene;
            // model.rotation.y = 0.5;
            MoveObject(model)
            // model.rotation.x=-.1
            scene.add(model);
            function animate() {
              requestAnimationFrame(animate);
              renderer.render(scene, camera);
            }
            animate();
          },
          undefined,
          function (error) {
            console.error("Error loading model:", error);
          }
        );
}
export default Threejs;