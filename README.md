# BannerApi-npm
## Installation
```bash
npm install banner-api
```
## Usage
For example to call and output data from all endpoints
```javascript
var banner-api = require('banner-api')
banner-api("schoolCode","UserId","Pass", function(api) {
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
