# BannerApi-npm
## Installation
```bash
npm install banner-api
```
## Usage
To get an instance of the API use:
```javascript
var banner-api = require('banner-api')
banner-api.create("schoolCode","UserId","Pass",callback)
```
The passed in callback function will be called with the apiInstance once it is loaded

An apiInstance has a field apiEndpoints that is an array of apiEndpoints

An apiEndpoint has 
- A method call(callback) with the returned data from theendpoint being passed to the callback function in the format:
```javascript
{
	name:EndpointName String,
	data:EndpointData JSObject
}
```
- Fields
  - apiType
  - apiName
  - urlName
  
For example to call and output data from all endpoints
```javascript
var banner-api = require('banner-api')
banner-api.create("schoolCode","UserId","Pass", function(api) {
	for(x in api.apiEndpoints){
    var endpoint = api.apiEndpoints[x]
    endpoint.call(function(data) {
      console.log(data['name'] + '')
      console.log(data['data'])
    })
	}
})
```


## Known School Codes
- Wilfrid Laurier University - 757
