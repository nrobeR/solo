var width = 800;
var height = 500;
var radius = 5;
var node, link;

var board = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

var randomGenerator = function(n){
  return Math.floor(Math.random()*n);
};

var randomX = function(){return randomGenerator(width-radius*2);}
var randomY = function(){return randomGenerator((height-radius*2))}

var friends = board.selectAll(".friends")
                   .data(TestData.nodes)
                   .enter()
                   .append('circle')
                   .attr({
                   	class: "friend",
                   	cx: randomX,
                   	cy: randomY,
                   	r: radius
                   })
                   .style("fill","#E05723");


