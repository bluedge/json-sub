/**
 * Replace Placeholders in any JSON
 * @param json {Object}
 * @param variables {Object}
 * @param callback {Function}
**/
function jsonSub (json, variables, callback) {
	var str = JSON.stringify(json);
	var output = str.replace(/\{{\w+}}/g, function(found) {
		return variables[found] || found;
	});
	
	callback(JSON.parse(output));
}


/**
 * Replace Placeholders in any JSON
 * Synchronous mode
 * @param json {Object}
 * @param variables {Object}
 * return {Object}
**/
jsonSubSync.prototype.SubSync = function (json, variables) {
	var str = JSON.stringify(json);
	var output = str.replace(/\{{\w+}}/g, function(found) {
		return variables[found] || found;
	});
	
	return JSON.parse(output);
}


module.exports = jsonSub;