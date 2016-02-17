try {
	delete window.render_object_instance;
}
catch(err) {
	console.log(err);
}

window.render_object_instance = new RenderObject(window.reserved_color_variable, window.reserved_opacity_variable );
window.render_object_instance.render();