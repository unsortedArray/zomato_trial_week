var path =""
var key =""
var graphData =""
var densityCanvas = document.getElementById("densityChart");

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
     renderChartjs()
  
});


var densityData = {
  label: 'Density of Planet (kg/m3)',
  data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638],
  backgroundColor: 'rgba(0, 99, 132, 0.6)',
  type:'line',
  borderWidth: 0,
  yAxisID: "y-axis-density"
};

var gravityData = {
  label: 'Gravity of Planet (m/s2)',
  data: [3.7, 8.9, 9.8, 3.7, 23.1, 9.0, 8.7, 11.0],
  backgroundColor: 'rgba(99, 132, 0, 0.6)',
  borderWidth: 0,
  yAxisID: "y-axis-gravity"
};

var planetData = {
  labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
  datasets: [densityData, gravityData]
};

var chartOptions = {
  scales: {
    xAxes: [{
      barPercentage: 1,
      categoryPercentage: 0.6
    }],
    yAxes: [{
      id: "y-axis-density"
    }, {
      id: "y-axis-gravity"
    }]
  }
};

function renderChartjs()
{
	var barChart = new Chart(densityCanvas, {
	type: 'bar',
	data: planetData,
	options: chartOptions
	});
}
function QueriesDatabaseBackend(){

	var query = 'select resName,ammount  from [orders] JOIN restaurants on[orders].restaurant = restaurants.id  where ammount>=200' 
	$.get('http://127.0.0.1:8080/test?query='+query,function(data)
	{
		graphData = data
		//getDimmensions(graphData)
	})
	//console.log(data)


	//console.log( Object.keys(data))
	

}
// function getDimmensions(value)
// {
// 	console.log(value)
// 	var keys  = Object.keys(value[0]);
// 	for key in keys:

// }
