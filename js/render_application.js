var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );

//var color_selected = parseInt( ("0x" + window.processing_color), 16);
var color_selected = parseInt( ("0x" + "00ff00"), 16);
var material = new THREE.MeshBasicMaterial( { color: color_selected }, {alphaMap: 0x000000} );  //set the color of the material

var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function render() {
requestAnimationFrame( render );

cube.rotation.x += 0.01;   //rotate the cube at this rate on refresh
cube.rotation.y += 0.01;   //rotate the cube at this rate on refresh

renderer.render( scene, camera );
}
render();