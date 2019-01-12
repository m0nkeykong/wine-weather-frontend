$("#ldview1").click(() => {
    //get data
    var request = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://wine-weather.herokuapp.com/api/AlcoholVolsEachCountry"; // site that doesn’t send Access-Control-*
    request.open('GET', proxyurl + url, true);
    request.send()

    //basic frame size
    var width = 1400, height = 600;

    //append square view to body
    var svg = d3.select("#bubble").append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("class", "surface")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //set force to split the objects
    var forceXsplit = d3.forceX((d) => {
        if (Object.values(d)[1] > 15) return -450;
        else return 450;
    }).strength(0.05);

    //set force to combine the objects - starting point
    var forceXcombine = d3.forceX(0).strength(0.05);

    //define general radius of floating objects
    var radiusScale = d3.scaleSqrt().domain([1, 2187]).range([50, 200]);

    //define force to attrackt and split the objects
    var simulation = d3.forceSimulation()
        .force('x', forceXcombine)
        .force('y', d3.forceY().strength(0.05))
        .force('collide', d3.forceCollide((d) => {
            return radiusScale(Object.values(d)[0]) + 2;
        }));

    //start analyzing the data
    request.onload = function () {
        var wineData = JSON.parse(this.response);
    
        d3.json("data.json").then((data) => {
            console.log(wineData);
            
            var circles = svg.selectAll('.surface')
                .data(data)
                .enter()
                .append("g")
                .attr("class", "floatingObj")
                .append('circle')
                .attr('class', 'country')
                .attr('r', (d) => {
                    return radiusScale(Object.values(d)[0]);
                })
                .attr('fill', (d, i) => {
                    return "hsl(" + Math.random() * 360 + ",68%,69%)";
                })
                .on('click', (d) => {
                    console.log(d);
                });

            //button listeners
            d3.select('#split').on('click', () => {
                simulation.force('x', forceXsplit)
                    .alphaTarget(0.25)
                    .restart();
                console.log('split')
            })

            d3.select('#combine').on('click', () => {
                simulation.force('x', forceXcombine)
                    .alphaTarget(0.25)
                    .restart()
                console.log('combine')
            })

            simulation.nodes(data).on('tick', ticked);

            //update circles location at every tick
            function ticked() {
                circles.attr('cx', (d) => {
                    return d.x;
                }).attr('cy', (d) => {
                    return d.y;
                });
            }
            return svg;
        }).then((svg) => {
            setTimeout(() => {
                svg.selectAll(".floatingObj").append("svg:text")
                    .attr("x", (d) => {
                        return d.x;
                    })
                    .attr("y", (d) => {
                        return d.y;
                    })
                    .attr("text-anchor", "middle")
                    .text((d) => {
                        return Object.keys(d)[0]
                    }).style("font-size", (d) => {
                        return "10px"
                    });
            }, 2500);

        });
    }
});