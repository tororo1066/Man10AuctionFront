import React from "react";
import {
    BoxGeometry,
    EdgesGeometry, LineBasicMaterial,
    LineSegments,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import {MinecraftModelLoader, MinecraftTextureLoader} from "three-mcmodel";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {
    isMinecraftModelFace,
    MinecraftModelElement
} from "three-mcmodel/src/model";
const MinecraftModelViewerProps: React.FC = () => {

    const scene = new Scene();
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(16, 16, 64)

    const renderer = new WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true

    scene.add(new LineSegments(
        new EdgesGeometry(new BoxGeometry(16, 16, 16)),
        new LineBasicMaterial({ color: 0x1111cc, linewidth: 3 })
    ))

    loadModel()
    animate()

    function loadModel() {
        const modelUrl = require('./assets/cake.json')
        const textureUrls: {
            [path: string]: string
        } = {
            'block/cake_bottom': require('./assets/cake_bottom.png'),
            'block/cake_side': require('./assets/cake_side.png'),
            'block/cake_top': require('./assets/cake_top.png')
        }

        const model = require('./assets/cake.json')

        console.log(model.elements.every(isMinecraftModelElement))


        new MinecraftModelLoader().load(modelUrl, mesh => {
            const textureLoader = new MinecraftTextureLoader()
            mesh.resolveTextures(path => textureLoader.load(textureUrls[path]))
            scene.add(mesh)
            console.log("loaded")
        }, undefined, error => { console.error(error) })
    }

    function isMinecraftModelElement (element: any): element is MinecraftModelElement {
        let faceCount

        return (
            element &&
            element.faces &&
            (faceCount = Object.keys(element.faces).length) >= 1 &&
            faceCount <= 6 &&
            [
                element.faces.down, element.faces.up,
                element.faces.north, element.faces.south,
                element.faces.west, element.faces.east
            ]
                .every((face: any) =>
                    face === undefined || isMinecraftModelFace(face)
                )
        )
    }

    function animate () {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }

    console.log("called")
    return (
        //sceneを表示する
        <div ref={ref => ref && ref.appendChild(renderer.domElement)} />
    );
}

export default MinecraftModelViewerProps;