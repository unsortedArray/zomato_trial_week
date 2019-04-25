var path =""
var key =""
var graphData =""
var densityCanvas = document.getElementById("densityChart");
var mylabels = []
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
window.addEventListener('load', function() {
	var urlString = window.location.href;
	var url = new URL(urlString);
    
    path =url.searchParams.get('db_ref')
    key = url.searchParams.get('key')
    QueriesDatabaseBackend()

    // data =[]
    // labels =[]
    // for mydata in graphData:
    // 	mydata.append(graphData[])
     //renderChartjs()
  
});



//var type = ['line','bar']
function renderChartjs(data,chartOptions)
{
	console.log(data['data'])
	console.log(type)
	var mixedChart = new Chart(densityChart, {
    type: type[Math.floor(Math.random()*2)],
    data: {
        datasets: [{
            label: 'Bar Dataset',
            data:data['data']
        }, {
            label: 'Line Dataset',
            data: data['data'],

            // Changes this dataset to become a line
            type: 'line'
        }],
        labels: data['labels']
    },
    options:  {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
	// var barChart = new Chart(densityCanvas, {
	// type: 'bar',
	// data: data,
	// options: {
 //        scales: {
 //            yAxes: [{
 //                ticks: {
 //                    beginAtZero: true
 //                }
 //            }]
 //        }
 //    }
	// });
}
function QueriesDatabaseBackend(){

	var query = 'select resName,ammount  from [orders] JOIN restaurants on[orders].restaurant = restaurants.id  where ammount>=200' 
	console.log('Here')
	$.get('http://127.0.0.1:8080/test?query='+query,function(data)
	{
		graphData = data
		getDimmensions(graphData)
		
	})
	//console.log(data)


	//console.log( Object.keys(data))
	

}
function getDimmensions(value)
 {
	

	var mylabels = ((Object.values(Object.keys(value[0]))))
	var output = value.map(function(obj) {
  		return Object.keys(obj).map(function(key) { 
    	return obj[key];
  		});
	});
	output = output[0].map((col, i) => output.map(row => row[i]));
	//console.log(output,mylabels)
	configureChart(output,mylabels)
}
function configureChart(output, mylabels)
{

var planetData = {
  labels: output[0],
  data: output[1]
};

var chartOptions = {
  
};
 renderChartjs(planetData,chartOptions)
}
