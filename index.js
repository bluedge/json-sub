var traverse = require('traverse');


function jsonSub() {	
	/**
	 * Replace Placeholders in any JSON
	 * Member mode allow to replace object member 
	 * without using the {{}} of left part of the variables
	 * @param json {Object}
	 * @param variables {Object}
	 * @param memberMode {Boolean}
	 * @param callback {Function}
	**/
	var substitute = function (json, variables, memberMode, callback) {
		if (typeof memberMode == 'function') {
			callback = memberMode;
			var member_mode = memberMode || false;
		} else {
			var member_mode = memberMode || false;
		}
			
		var str = JSON.stringify(json);
		var output = str.replace(/\{{\w+}}/g, function(found) {
			found = (member_mode) ? found.replace(/\{|}/g, '') : found;
			
			// Traverse object
			var f;
			traverse(variables).forEach(function (x) {
				if (x && typeof x[found] != 'undefined') {
					if (typeof x[found] != 'string') {
						// Stringify if not string yet
						return f = JSON.stringify(x[found]);
					} else {
						return f = x[found] || found;
					}
				}
			});
			return f;
		});
		
		// Array must have the first and last " stripped
		// otherwise the JSON object won't be valid on parse
		output = output.replace(/"\[(.*)\]"/, '[$1]');
	
		callback(JSON.parse(output));
	}
	
	
	/**
	 * Replace Placeholders in any JSON
	 * in Synchronous mode
	 * Member mode allow to replace object member 
	 * without using the {{}} of left part of the variables
	 * @param json {Object}
	 * @param variables {Object}
	 * @param memberMode {Boolean}
	 * return {Object}
	**/
	substituteSync = function (json, variables, memberMode) {
		var member_mode = memberMode || false;
		var str = JSON.stringify(json);
		var output = str.replace(/\{{\w+}}/g, function(found) {
			found = (member_mode) ? found.replace(/\{|}/g, '') : found;
			
			// Traverse object
			var f;
			traverse(variables).forEach(function (x) {
				if (x && typeof x[found] != 'undefined') {
					if (typeof x[found] != 'string') {
						// Stringify if not string yet
						return f = JSON.stringify(x[found]);
					} else {
						return f = x[found] || found;
					}
				}
			});
			return f;
		});
		
		// Array must have the first and last " stripped
		// otherwise the JSON object won't be valid on parse
		output = output.replace(/"\[(.*)\]"/, '[$1]');

		return JSON.parse(output);
	}
		
	
	return {
		substitute : substitute,
		substituteSync : substituteSync
	}
	
}


module.exports = jsonSub;