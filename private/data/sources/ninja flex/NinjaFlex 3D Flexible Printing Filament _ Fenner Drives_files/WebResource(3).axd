function addClickFunction(id) {
    var b = document.getElementById(id);
    if (b && typeof(b.click) == 'undefined') {
		b.click = function() {
			var result = true;
			if (b.onclick) {
				result = b.onclick();
			}
			if (typeof(result) == 'undefined' || result) {
				eval(b.href);
			}
		}
	}
};
