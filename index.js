var traverse 		= require('traverse');
var objectPath 		= require('object-path'); 



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
		var output = str.replace(/{{\w+}}/g, function(found) {
			found = (member_mode) ? found.match(/[\w\.]+/)[0] : found;
			
			// Traverse object
			var f;
			traverse(variables).forEach(function (v) {
				if (v && typeof v[found] != 'undefined') {
					if (typeof v[found] != 'string') {
						// Stringify if not string yet
						f = JSON.stringify(v[found]);
					} else {
						f = v[found] || found;
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
	var substituteSync = function (json, variables, memberMode) {
		var member_mode = memberMode || false;
		var str = JSON.stringify(json);
		var output = str.replace(/{{\w+}}/g, function(found) {
			found = (member_mode) ? found.match(/[\w\.]+/)[0] : found;

			// Traverse object
			var f;
			traverse(variables).forEach(function (v) {
				if (v && typeof v[found] != 'undefined') {
					if (typeof v[found] == 'object') {
						// Stringify if not string yet
						console.log(v[found]);
					} else {
						f = v[found] || found;
					}
				}
				return f;
			});
			
		});
		
		// Array must have the first and last " stripped
		// otherwise the JSON object won't be valid on parse
		output = output.replace(/"\[(.*)\]"/, '[$1]');

		return JSON.parse(output);
	}
	
	
	
	/**
	 * Resolve object paths in variables 
	 * and assigns the returned result 
	 * from datamodel path
	 * @param data {Object}
	 * @param variables {Object}
	 * return {Object}
	**/
	var addresser = function(datamodel, variables) {
		traverse(datamodel).forEach(function(path) {
			//console.log(path);
			if (this.isLeaf && objectPath.has(variables, path)) {
				this.update(objectPath.get(variables, path));
			}
		});
		return datamodel;
	}
	
	
	
		
	
	return {
		substitute : substitute,
		substituteSync : substituteSync,
		addresser : addresser
	}
	
}


module.exports = jsonSub;