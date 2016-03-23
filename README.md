#jsonSub
Lightweight module for substitution in json object. Use {{placeholder}} (double curly braces) to define your placeholder in the json object and the variables object.


## Install

```bash
npm install json-sub
```

	
### Usage Example

```js
	var jsonSub = require('json-sub');
	
	var json = [{
		method : 'get',
		path : '/reports/{{campaign_id}}/members',
	},
	{
		method : 'get',
		path : '/city/{{store_id}}/turnover',
	}];

	var variables = {
		'{{campaign_id}}' : 'mc1234567d',
		'{{store_id}}' : 76890
	}
	
	// Substitution
	var jsonSub(json, variables, function(result) {
		console.log(result);
	});
```  