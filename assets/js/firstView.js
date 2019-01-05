$("#ldview2").click(() => {
    //get data
    










    //create View 2 to display
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        axisY: {
            includeZero: false,
            title: "Alcohol/Lit",
            crosshair: {
                enabled: true
            },
            gridColor: "white"
        },
        data: [{
            fillOpacity: .7,
            type: "rangeBar",
            indexLabel: "{y[#index]}%",
            toolTipContent: "<b>Country</b>: {label} <br> <b>Alcohol Precent</b>: {y[0]}% - {y[1]}%<br> <b>Price Range</b>: {price[0]}$ - {price[1]}$",
            dataPoints: [
                { y: [12.7, 30], label: "Israel", price: [10, 20]},
                { y: [12.7, 30], label: "Russia", price: [10, 20] },
                { y: [12.7, 30], label: "Italy", price: [10, 20] },
                { y: [12.7, 30], label: "Spain", price: [10, 20] },
                { y: [12.7, 30], label: "USA", price: [10, 20] }
            ]
        }]
    });
    chart.render();
});