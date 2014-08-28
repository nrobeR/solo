var express = require("express");
var Promise = require("bluebird");

exports.filterConnections = function(connections){
  return connections.values;
};