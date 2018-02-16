function updateLineChart(time, liveData) {
//    let newTime = moment(time)
    let chartDoesntExists = true
    if (chartDoesntExists) {
        chartDoesntExists = false
        var data = {
            labels: time,
            datasets: [
                {
                    label: "Prime and Fibonacci",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: liveData
                }
            ]
        };
        if (time.length > 10) {
            time.shift()
        }
        if(liveData.length > 10) {
            liveData.shift()
        }
        
        let chartContainer = document.querySelector("#lineChart")
        let ctx
        if (chartContainer) {
            ctx = chartContainer.getContext("2d")
        }
        //var ctx = document.querySelector("#lineChart").getContext("2d");

        var options = {
            animation: false,
            scales: {
                xAxes: [{
                    type: 'time',
                    ticks: {
                        maxRotation: 90,
                        minRotation: 80
                    },
                    time: {
                        format: 'HH:mm',
                        tooltipFormat: 'HH:mm',
                        unit: 'second',
                        stepSize: 40,
                        displayFormats: {
                            'minute': 'HH:mm',
                            'hour': 'HH:mm'
                        }
                    }
                }]
            }
        }
        if (ctx) {
          var lineChart = new Chart(ctx).Line(data, options);
        }
//        let lineChart = new Chart(ctx, {
//            type: 'line',
//            data: data,
//            options: options
//        })
    } else {
//        lineChart.config.data = liveData
        lineChart.datasets[0].data.value = liveData;
        lineChart.update({
            duration: 7000,
            easing: 'none'
        })
    } 
}

//function reRenderChart(timeArr, ethPriceArr) {
// destroy old chart;
// create new chart based on updated timeArr and ethPriceArr;
//}

//setInterval(reRenderChart, 5000)