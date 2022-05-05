//getting the canvas
const canvas = document.querySelector('.myCanvas');

//init scene
const scene = new THREE.Scene();

//textureloader
const textureLoader = new THREE.TextureLoader()

//array with paths to textures
const textureList = [
    'textures/sun.jpg',
    'textures/moon.jpg',
    'textures/mars.jpg',
    'textures/jupiter.jpg',
    'textures/saturn.jpg',
    'textures/uranus.jpg',
    'textures/neptune.jpg',
    'textures/venus.jpg'
]

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)

const makeSphere = () => {
    let randomInt = Math.floor(Math.random() * textureList.length)
    let randomTexture = textureLoader.load(textureList[randomInt])
    console.log(randomTexture)

    //const sphereMaterial = new THREE.MeshBasicMaterial({color: 'red', wireframe:true})
    const sphereMaterial = new THREE.MeshBasicMaterial({map: randomTexture})
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    sphere.position.x = (Math.random()-0.5) * 50
    sphere.position.y = (Math.random()-0.5) * 50
    sphere.position.z = (Math.random()-0.5) * 50   
    
    sphere.rotation.x = Math.random() * Math.PI // math.PI is een halve rotatie
    sphere.rotation.y = Math.random() * Math.PI

    scene.add(sphere)
}


/*
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//updating the canvas when the window is resized
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


/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 300)

//setting camera position
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5

//adding camera to the scene
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)

//setting devices pixelratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Controls

const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true

//generating the universe
document.querySelector(".generate").addEventListener("click", (e) => {
    let planetNum = document.querySelector(".planets").value;
    document.querySelector(".planets").value =""
    //console.log(planetNum)

    while(scene.children.length > 0){
        scene.remove(scene.children[0])
    }

    for(let i = 0; i <= planetNum; i++){
        makeSphere()
    }
   
})

//event listener for the canvas
canvas.addEventListener('click', (e) => {
    makeSphere()
 
})


//checkbox eventlistener
let animationId
document.querySelector("#checkbox").addEventListener("change", (e) => {

    if(e.target.checked){
        console.log('start')
        const moveCamera = () => {
            const elapsedTime = clock.getElapsedTime();
            //console.log(elapsedTime)
            camera.position.x += Math.cos(elapsedTime)
            camera.position.y += Math.sin(elapsedTime)
            animationId = window.requestAnimationFrame(moveCamera)
        }
        moveCamera()
    } else {
        console.log('stop')
        window.cancelAnimationFrame(animationId)
    }
    
})

/*
 * Animate
 */

// Clock
const clock = new THREE.Clock()

// Animations
const animate = () => {


    //updating the controls
    controls.update()
    // Render
    renderer.render(scene, camera)

    // Request new frame
    window.requestAnimationFrame(animate)
}
animate()