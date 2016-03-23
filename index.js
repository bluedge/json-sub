/**
 * Replace Placeholders in any JSON
 * @param json {Object}
 * @param varibles {Object}
 * @param callback {Function}
**/
function jsonSub (json, variables, callback) {
	var str = JSON.stringify(json);
	var output = str.replace(/\{{\w+}}/g, function(found) {
		return variables[found] || found;
	});
	
	callback(JSON.parse(output));
}


module.exports = jsonSub;