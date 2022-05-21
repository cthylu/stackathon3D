import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Vector3 } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader()

// Objects
const skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
const skybox = new THREE.Mesh(skyboxGeo, new THREE.MeshBasicMaterial({ color: "#a4d8ed", side: THREE.BackSide }));
scene.add(skybox);

const fbxLoader = new FBXLoader();
fbxLoader.load(
  '/models/motorcycle.fbx',
  (object) => {
    scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
  (error) => {
    console.log(error)
  }
)

// const axesHelper = new THREE.AxesHelper(1)
// scene.add(axesHelper)

const lineTire = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 2), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
lineTire.position.set(0, 0.5, -7.5)
scene.add(lineTire);
const lineFuel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 0.1), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
lineFuel.position.set(0, 7, 1)
scene.add(lineFuel);
const lineChain = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 2), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
lineChain.position.set(1, 2, -6)
scene.add(lineChain);
const lineOil = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.4, 0.1), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
lineOil.position.set(-1, 1, -0.2)
scene.add(lineOil);
const lineBrakeFluid = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.5, 0.1), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
lineBrakeFluid.position.set(-1, 7.8, 3)
scene.add(lineBrakeFluid);
const lineBrakePads = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 2), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
lineBrakePads.position.set(1, 2, 6)
scene.add(lineBrakePads);

const boxButton = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 3), new THREE.MeshBasicMaterial({ color: "#FFFFFF" }));
boxButton.position.set(13.5, 0, 0)
scene.add(boxButton);

const fontSpecs = {
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
};

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry('Hello Cathy! This is your bike!', { ...fontSpecs, font, size: 1.25 });
        const textMaterial = new THREE.MeshBasicMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.rotation.y = Math.PI * 0.5;
        textGeometry.center()
        text.position.x = 6;
        scene.add(text)
        const textGeometry2 = new TextGeometry('Make sure to check', { ...fontSpecs, font, size: 1 });
        const textMaterial2 = new THREE.MeshBasicMaterial()
        const text2 = new THREE.Mesh(textGeometry2, textMaterial2)
        text2.rotation.y = Math.PI * 0.5;
        textGeometry2.center()
        text2.position.x = 9;
        text2.position.y = 0;
        scene.add(text2)
        const textGeometry3 = new TextGeometry('all these parts before riding', { ...fontSpecs, font, size: 1 });
        const textMaterial3 = new THREE.MeshBasicMaterial()
        const text3 = new THREE.Mesh(textGeometry3, textMaterial3)
        text3.rotation.y = Math.PI * 0.5;
        textGeometry3.center()
        text3.position.x = 11;
        text3.position.y = 0;
        scene.add(text3)

        const titleText = new THREE.Mesh(new TextGeometry('Motorcycle', { ...fontSpecs, font, size: 4 }), 
        new THREE.MeshBasicMaterial())
        titleText.rotation.y = Math.PI;
        titleText.position.x = 1;
        titleText.position.y = 9;
        titleText.position.z = 25;
        scene.add(titleText)
        const titleText2 = new THREE.Mesh(new TextGeometry('Saftey', { ...fontSpecs, font, size: 4 }), 
        new THREE.MeshBasicMaterial())
        titleText2.rotation.y = Math.PI;
        titleText2.position.x = 1;
        titleText2.position.y = 3;
        titleText2.position.z = 25;
        scene.add(titleText2)
        const titleText3 = new THREE.Mesh(new TextGeometry('Checklist', { ...fontSpecs, font, size: 4 }), 
        new THREE.MeshBasicMaterial())
        titleText3.rotation.y = Math.PI;
        titleText3.position.x = 1;
        titleText3.position.y = -3;
        titleText3.position.z = 25;
        scene.add(titleText3)

        const tirePressureText = new THREE.Mesh(new TextGeometry('Tire Pressure', { ...fontSpecs, font }), textMaterial)
        tirePressureText.rotation.y = Math.PI * 0.5;
        tirePressureText.position.y = 0.5;
        tirePressureText.position.z = -8.5;
        scene.add(tirePressureText)

        const fuelText = new THREE.Mesh(new TextGeometry('Fuel Supply', { ...fontSpecs, font }), textMaterial)
        fuelText.rotation.y = Math.PI * 0.5;
        fuelText.position.y = 8;
        fuelText.position.z = 1;
        scene.add(fuelText)

        const chainText = new THREE.Mesh(new TextGeometry('Drive Chain', { ...fontSpecs, font }), textMaterial)
        chainText.rotation.y = Math.PI * 0.5;
        chainText.position.set(1, 2, -7.5)
        scene.add(chainText)

        const oilText = new THREE.Mesh(new TextGeometry('Oil Dipstick', { ...fontSpecs, font }), textMaterial)
        oilText.rotation.y = Math.PI * 0.5;
        oilText.position.x = -1;
        oilText.position.y = -1;
        oilText.position.z = 1.5;
        scene.add(oilText)

        const brakeFluidText = new THREE.Mesh(new TextGeometry('Brake Fluid', { ...fontSpecs, font }), textMaterial)
        brakeFluidText.rotation.y = Math.PI * 0.5;
        brakeFluidText.position.set(-1, 9, 3);
        scene.add(brakeFluidText)

        const brakePadsText = new THREE.Mesh(new TextGeometry('Brake Pads', { ...fontSpecs, font }), textMaterial)
        brakePadsText.rotation.y = Math.PI * 0.5;
        brakePadsText.position.set(1, 2, 10.8)
        scene.add(brakePadsText)

        const buttonTextGeo = new TextGeometry('OK', { ...fontSpecs, font });
        const buttonText = new THREE.Mesh(buttonTextGeo.center(), new THREE.MeshBasicMaterial({ color: "#000000", size: 1.5 }))
        buttonText.rotation.x = Math.PI * 1.5
        buttonText.rotation.z = Math.PI * 0.5
        buttonText.position.set(13.5, 0, 0)
        scene.add(buttonText)
    }
)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a4d8ed' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
//scene.add(floor)

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
//gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Window
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.x = 20
camera.position.y = 10
camera.position.z = 0
camera.lookAt(new Vector3(0,10,0));
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
let currentIntersect = null;
const objectsToTest = [...scene.children];
objectsToTest.shift();
console.log(objectsToTest);

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

// Tick
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(objectsToTest)
    
    if(intersects.length){
        //if(!currentIntersect) {
            for(const intersect of intersects)
            {
                intersect.object.material.color.set('#0000ff')
                console.log(intersect)
            }
            //currentIntersect = intersects[0]
        //}
    }
    else {
        //if(currentIntersect) {
            for(const object of objectsToTest)
            {
                if(!intersects.find(intersect => intersect.object === object))
                {
                    //object.material.color.set('#ff0000')
                }
            }
        //}
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()