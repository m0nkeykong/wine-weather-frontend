$("#ldview2").click(() => {
    //get data
    var request = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://wine-weather.herokuapp.com/api/AlcoholVolsEachCountry"; // site that doesn’t send Access-Control-*
    request.open('GET', proxyurl + url, true);
    request.send();
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        var labels = [];
        var prices = [];
        var alcohols = [];
        for (var k in data){
            var maxPrice = 0.0, maxAlcohol = 0.0, minPrice = 0.0, minAlcohol = 0.0;
            labels.push(k);
            for(var i = 0; i < data[k].length; ++i){
                //console.log(data[k][i].Alcohol)
                data[k][i].Price = data[k][i].Price.substr(1);
                if (data[k][i].Price != 'rice pending'){       //to solve issues
                    if(maxPrice < data[k][i].Price) maxPrice = data[k][i].Price;
                }
                if(maxAlcohol < data[k][i].Alcohol) maxAlcohol = data[k][i].Alcohol;
            }
            prices.push(maxPrice);
            alcohols.push(maxAlcohol);
        }      

        var ctx2 = document.getElementById("myChart2");
        ctx2.height = 140;
        new Chart(ctx2, {
            type: 'bar',
            options: {
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return tooltipItem[0].xLabel;
                        },
                        label: function (tooltipItem) {
                            return tooltipItem.datasetIndex === 1 ? 'Price: $' + tooltipItem.yLabel : 'Alcohol: ' + tooltipItem.yLabel + '%';
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: "black",
                            fontStyle: 600,
                            autoSkip: false
                        },
                        gridLines: {
                            color: "white",
                            fontStyle: 600
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Country',
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
                            labelString: 'Alcohol and Price',
                            fontColor: "black",
                            fontStyle: 600,
                            fontSize: 20
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontStyle: 1000,
                        fontColor: 'black',
                        borderColor: 'white',
                        borderWidth: 1
                    }
                }
            },
            data: {
                datasets: [
                    {
                        label: 'Alcohol',
                        data: alcohols,
                        type: 'line'
                    },
                    {
                        label: 'Price',
                        data: prices,
                        backgroundColor: 'white'
                    }
                ],
                labels: labels
            }
        });
        console.log('view 2 loaded');
    }
});