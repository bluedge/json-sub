#jsonSub
Lightweight module for substitution in json object. Use {{placeholder}} (double curly braces) to define your placeholder in the json object and the variables object.

**Option** : memberMode {Boolean}  Member mode allows to replace object member without using the {{}} of left part of the variables


## Install

```bash
npm install json-sub
```

	
### Usage Example

```js
	var jsonSub = require('json-sub')();
	
	var json = [{
		"method" : "get",
		"path" : "/reports/{{campaign_id}}/members",
	},
	{
		"method" : "get",
		"path" : "/city/{{store_id}}/turnover",
	}];

	var variables = {
		'{{campaign_id}}' : 'mc1234567d',
		'{{store_id}}' : 76890
	}
	
	/** Variables in memberMode
	var variables = {
		'campaign_id' : 'mc1234567d',
		'store_id' : 76890
	}
	**/
	
	// Substitution
	jsonSub.substitute(json, variables, function(result) {
		console.log(result);
	});
	
	/** With memberMode : true
	jsonSub.substitute(json, variables, true, function(result) {
		console.log(result);
	});
	**/
	
	
	// OUTPUTS
	/* [
		{ method: 'get', path: '/reports/mc1234567d/members' },
		{ method: 'get', path: '/city/76890/turnover' }
	] */
```  


### Synchronous Method
```js
	var jsonSub = require('json-sub')();
	
	// In Synchronous mode
	var result = jsonSub.substituteSync(json, variables);
	
	/** With memberMode : true
	var result = jsonSub.substituteSync(json, variables, true);
	**/
	
``` 

### Addresser Method
```js
	var jsonSub = require('json-sub')();
	
	var DataModel = {
		reportOne : "report.memberOne",
		reportTwo : "report.memberTwo",
		winner : "report.winner.one"
	};

	var variables = {
		report : {
			memberOne: 'abcd123',
			memberTwo: 'efg456',
			winners : {
				one : 'Alex',
				two : 'Norman'
			}
		}	
	};
	
	var add = jsonSub.addresser(DataModel, variables);
	
	// OUTPUTS
	/*
	{reportOne : 'abcd123', reportTwo: 'efg456', winner: 'Alex'}
	*/
	
``` 