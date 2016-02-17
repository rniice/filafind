var RenderObject = function(color, opacity){
	this.target_canvas = document.getElementById('threeJS-Canvas');

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 100, this.target_canvas.width/this.target_canvas.height, 0.1, 1000 );

	this.renderer = new THREE.WebGLRenderer({canvas: this.target_canvas});
	this.renderer.setSize(180, 180);

    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(this.ambientLight);
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(-30, 60, 60);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);


	this.geometry = new THREE.BoxGeometry( 4, 4, 4 );

	this.color_selected = parseInt( ("0x" + color), 16);
	this.opacity 		= opacity;
	//window.alert(this.opacity);
	//var color_selected = parseInt( ("0x" + "00ff00"), 16);
	//this.material = new THREE.MeshBasicMaterial( { color: this.color_selected }, {alphaMap: 0x000000} );  //set the color of the material
	this.material = new THREE.MeshLambertMaterial({ color: this.color_selected}, {alphaMap: this.opacity} );  //set the color of the material

	this.cube = new THREE.Mesh( this.geometry, this.material );
	this.scene.add( this.cube );

	this.camera.position.z = 6;

}	

RenderObject.prototype.render = function (){
	//this.frameID = requestAnimationFrame( this.render.bind(this));
	this.frameID = requestAnimationFrame( this.render.bind(this) );

	this.cube.rotation.x += 0.01;   //rotate the cube at this rate on refresh
	this.cube.rotation.y += 0.01;   //rotate the cube at this rate on refresh

	this.renderer.render( this.scene, this.camera );
}

