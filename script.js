//getting the canvas
const canvas = document.querySelector('.myCanvas');

//init scene
const scene = new THREE.Scene();


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

   
})

//event listener for the canvas
canvas.addEventListener('click', (e) => {

 
})


//checkbox eventlistener
document.querySelector("#checkbox").addEventListener("change", (e) => {


    
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