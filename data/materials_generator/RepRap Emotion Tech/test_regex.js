var composition_regex = new RegExp('([\\w]+)', 'ig');

var string_test = "dog eat shit bitch";

var result = string_test.match(composition_regex)[0];

console.log(result);