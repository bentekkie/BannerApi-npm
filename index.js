var request = require('request-promise-native')

var BannerApi = function BannerApi(apiEndpoints) {
  this.apiEndpoints = apiEndpoints
}


BannerApi.create = function (code, user, pass, cb) {
  var appConfigURL = "http://mobile.elluciancloud.com/mobilecloud/api/applicationConfiguration/"+code;
  var params = {
  	"user":user,
  	"pass":pass
  };
  var config;
  request.get(appConfigURL)
  		.then(function (htmlString) {
  			return JSON.parse(htmlString)
  		})
  		.then(function (cfg) {
  			config = cfg
  			var options = {
  				uri:config['security']['url'],
  				auth:params
  			}
  			return request.get(options)
  		})
  		.then(function (htmlString) {
  			userInfo = JSON.parse(htmlString)
  			var APIEndpoints = []
			for(x in config['mapp']){
				var item = config['mapp'][x]
				if('urls' in item && !('external' in item) && item['type'] !== 'web'){
					for(i in item['urls']){
						var url = item['urls'][i];
						var api = new ApiEndpoint_(url, params, userInfo['userId'], item['type'], item['name'], i);
						APIEndpoints.push(api)
					}
				}
			}
			cb(new BannerApi(APIEndpoints))
  		})
  		 .catch(err => console.log)
}
function ApiEndpoint_(url, params, userId, apiType, name, urlName){
  this.params = params;
  this.url = url;
  this.userId = userId;
  this.apiType = apiType;
  this.apiName = name;
  this.urlName = urlName;
  this.options = {
  		uri:url+"/"+userId,
  		auth:params
  }
  this.str = "apiType = "+this.apiType+", apiName = "+this.apiName + ", urlName = " + this.urlName
  this.call = function(cb){
  	var string = this.str
  	request.get(this.options).then(function(htmlString) {
  		cb({name:string,data:JSON.parse(htmlString)})
  	}).catch(function(err) {
  		cb({name:string,data:{}})
  	})
  }
  
  ApiEndpoint_.prototype.toString = function ApiEndpointToStr() {
    return this.str
  }
}

module.exports = BannerApi