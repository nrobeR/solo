exports.createLinks = function(id,mutualConnectionArr){
  var result = [];
  mutualConnectionArr.forEach(function(connection){

  	result.push({source:id,target:connection.person.id,value:1});
  });
};

exports.createNodes = function(connectionArr){
  var result = [];

  connectionArr.forEach(function(item){
    if(item.id !== 'private'){
      result.push({
        name:item.firstName + " " + item.lastName,
        id:item.id,
        group:getIndustryId(item.industry),
        industry:item.industry
      });
    }
  })

  return result;
};

var getIndustryId = function(str){
  str = str || "not defined";
  return getIndexBelowMaxForKey(str,20)+1;
};


// This is a "hashing function". Use it
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