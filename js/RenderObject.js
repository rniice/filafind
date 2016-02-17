var RenderObject = function(color){
	this.target_canvas = document.getElementById('3js-canvas');

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 100, this.target_canvas.width/this.target_canvas.height, 0.1, 1000 );

	this.renderer = new THREE.WebGLRenderer({canvas: this.target_canvas});
	this.renderer.setSize(220, 220);

	this.geometry = new THREE.BoxGeometry( 3, 3, 3 );

	this.color_selected = parseInt( ("0x" + color), 16);
	//var color_selected = parseInt( ("0x" + "00ff00"), 16);
	this.material = new THREE.MeshBasicMaterial( { color: this.color_selected }, {alphaMap: 0x000000} );  //set the color of the material

	this.cube = new THREE.Mesh( this.geometry, this.material );
	this.scene.add( this.cube );

	this.camera.position.z = 5;

}	

RenderObject.prototype.render = function (){
	//this.frameID = requestAnimationFrame( this.render.bind(this));
	this.frameID = requestAnimationFrame( this.render.bind(this) );

	this.cube.rotation.x += 0.01;   //rotate the cube at this rate on refresh
	this.cube.rotation.y += 0.01;   //rotate the cube at this rate on refresh

	this.renderer.render( this.scene, this.camera );
}

