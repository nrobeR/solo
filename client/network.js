var width = 800;
var height = 500;
var radius = 10;
var node, link;

var board = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

var randomGenerator = function(n){
  return Math.floor(Math.random()*n);
};

var randomX = function(){return randomGenerator(width-radius*2);};
var randomY = function(){return randomGenerator((height-radius*2))};
var color = d3.scale.category20();

var force = d3.layout.force()
              .charge(-500)
              .linkDistance(30)
              .size([width,height]);

force.nodes(TestData.nodes)
     .links(TestData.links)
     .start();

var friends = board.selectAll(".friends")
                   .data(TestData.nodes)
                   .enter()
                   .append('g')
                   .attr("class","friend")
                   .call(force.drag);

friends.append("circle")
       .style("fill",function(d){return color(d.group);})
       .style("cursor","pointer")
       .attr("r",radius);

friends.append("text")
       .attr("dx",12)
       .attr("dy",".35em")
       // .attr("dy",12)
       .text(function(d){return d.name;});

var links = board.selectAll(".links")
                 .data(TestData.links)
                 .enter()
                 .append("line")
                 .attr("class","links")
                 .style("stroke-width",function(d){return Math.sqrt(d.value);});
                 // .style("stroke-width",5);

force.on("tick",function(){
  links.attr("x1",function(d){return d.source.x;})
      .attr("y1",function(d){return d.source.y;})
      .attr("x2",function(d){return d.target.x;})
      .attr("y2",function(d){return d.target.y;});

  // friends.attr("cx",function(d){return d.x})
  //        .attr("cy",function(d){return d.y});

  friends.attr("transform",function(d){return "translate(" + d.x + "," + d.y +")";});
})

