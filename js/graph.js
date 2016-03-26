
      var margin = {top:30, right:0, bottom:70,left:80 }

      var width = 1000 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom,
          barWidth = 25,
          barOffset = 5;
          //startYear = 1990,
          //endYear = 2012;

      var yScale,
          xScale,
          colours;

      var meteorites;
      var meteoriteCount = {};


      // Load csv
      d3.csv("Meteorite_Landings.csv", function(data) {
        meteorites = data;
        count(1990,2013);
      })


      function count(startYear,endYear){
        meteoriteCount = {};
        for (var i = 0; i < meteorites.length; i ++){
          // Extract year and parse integer
          var year = parseInt(meteorites[i].year.substring(6,10));

          // Check if year is within range
          if (year >= startYear && year <= endYear){
            // Check if there is already an entry for that year
            if (!(year in meteoriteCount)){
              meteoriteCount[year] = 1;
            }
            else{
              meteoriteCount[year] +=1;
            }
          }
        }

        //set the scale based on the data
        yScale = d3.scale.linear()
                  .domain([0,d3.max(d3.values(meteoriteCount))])
                  .range([0,height]);

        xScale = d3.scale.ordinal()
                  .domain(d3.range(0,d3.values(meteoriteCount).length))
                  .rangeBands([0,width-40]);

        colours = d3.scale.linear()
                  .domain([0,d3.max(d3.values(meteoriteCount))])
                  .range(["#3056e6","#f62359"]);
        draw();
      }

      function draw(){
        //console.log (meteoriteCount);
        d3.select("#chart").append("svg")
        //.style("background", "#000000")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append('g')
          .attr("transform", "translate("+margin.left+","+margin.top+")")
          .selectAll("rect").data(d3.values(meteoriteCount))
          .enter().append("rect")
            .style("fill", colours)
            .attr("width", xScale.rangeBand())
            .attr("height", function(d){
              return yScale(d);
            })
            .attr("x",function(d,i){
              return xScale(i);
            })
            .attr("y", function(d){
              return height - yScale(d);
            });

        // Y axis label
        d3.select("svg").append("text")
            .attr("text-anchor", "middle")
            .attr("y", 15)
            .attr("x",-height/2)
            .attr("transform", "rotate(-90)")
            .text("Number of Meteorite Landings")
            .attr("fill","#fff");

        // X axis label
        d3.select("svg").append("text")
            .attr("text-anchor", "middle")
            .attr("y", height + margin.top + margin.bottom )
            .attr("x",width/2+margin.left)
            .text("Year")
            .attr("fill","#fff");



        // Add vertical and horizontal axis
        var vGuideScale = d3.scale.linear()
                  .domain([0,d3.max(d3.values(meteoriteCount))])
                  .range([height,0]);

        var vAxis = d3.svg.axis()
                  .scale(vGuideScale)
                  .orient("left")
                  .ticks(10);

        var vGuide = d3.select("svg").append('g');

        vAxis(vGuide);

        vGuide.attr("transform","translate("+margin.left+","+margin.top+")")
        vGuide.selectAll("path")
                .style({fill:"none", stroke: "#fff"});
        vGuide.selectAll("line")
                .style({ stroke: "#fff"});
        vGuide.selectAll("text")
                .style({ fill: "#fff"});


        var hAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .tickFormat(function(d,i) {
                    var year = (d3.keys(meteoriteCount)[i]);
                    var length = d3.keys(meteoriteCount).length-1;
                    var interval = 5;

                    if (length > 70){
                      interval = 10;
                    }


                    // Make sure first and last values are always displayed
                    if (i != 0 && i != length){
                      if (i % interval == 0 && length - i > Math.floor(interval/2))
                        return year;
                    }
                    else{
                      return year;
                    }
                  });


        var hGuide = d3.select("svg").append("g")

        hAxis(hGuide);
        hGuide.attr("transform","translate("+margin.left+"," + (height +margin.top) + ")")
        hGuide.selectAll("path")
                .style({fill:"none", stroke: "#fff"});
        hGuide.selectAll("line")
                .style({ stroke: "#fff"});
        hGuide.selectAll("text")
                .style({ fill: "#fff"});

        hGuide.selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );






      }
