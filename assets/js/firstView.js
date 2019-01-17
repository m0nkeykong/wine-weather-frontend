$("#ldview1").click(() => {
    //get data
    var request = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://wine-weather.herokuapp.com/api/getDrinksPerCountry"; // site that doesn’t send Access-Control-*
    request.open('GET', proxyurl + url, true);
    request.send()

    request.onload = function () {
        var colors = new Set();
        var data = JSON.parse(this.response);
        var datasets = [];
        while (colors.size < Object.keys(data).length){
            colors.add(getRandomColor())
        }
        var iter = colors.values();
        for (var k in data) {
            var radius = data[k].Drinks > 100 ? data[k].Drinks / 20 : data[k].Drinks < 10 ? data[k].Drinks * 1.5 : data[k].Drinks;
            var valX = data[k].Drinks > 100 ? data[k].Drinks / 20 : data[k].Drinks < 10 ? data[k].Drinks * 1.5 : data[k].Drinks; 
            datasets.push({ 'label': data[k]._id, 'backgroundColor': iter.next().value, 'data': [{ 'x': valX, 'y': data[k].Temperature, r: radius }]});
        }

        var ctx = document.getElementById("myChart");
        ctx.height = 100;
        new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: datasets
            },
            options: {
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return datasets[tooltipItem[0].datasetIndex].label;
                        },
                        label: function (tooltipItem) {
                            return (Number(tooltipItem.xLabel) * 20) > 100 ? "Wine Types: " + Number(tooltipItem.xLabel) * 20 : "Wine Types: " + Number(tooltipItem.xLabel) / 1.5;
                        },
                        afterLabel: function (tooltipItem) {
                            return "Avg. Temperature: " + Number(tooltipItem.yLabel) + "C°";
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of wines',
                            fontColor: "black",
                            fontStyle: 600,
                            fontSize: 20
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontStyle: 600
                        },
                        gridLines: {
                            color: "white",
                            fontStyle: 600
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperature',
                            fontColor: "black",
                            fontStyle: 600,
                            fontSize: 20
                        }
                    }]},
                legend: {
                    labels: {
                        fontStyle: 700,
                        fontColor: 'black',
                        borderColor: 'white',
                        borderWidth: 1
                    }
                }
            }
        });
        console.log('view 1 loaded');
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}