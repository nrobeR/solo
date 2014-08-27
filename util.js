exports.createGraph = function(id,mutualConnectionArr){
  var result = [];
  mutualConnectionArr.forEach(connection){
  	result.push({source:id,target:connection.id,value:1});
  }
};

exports.createNodes = function(connectionArr){
  var result = [];
  connectionArr.forEach(item){
  	result.push({name:item.firstname + " " + item.lastname,id:item.id, group:getIndustryId(item.industry)});
  };

  return result;
};

var getIndustryId = function(str){
  return getIndexBelowMaxForKey(str,20)+1;
};


// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};