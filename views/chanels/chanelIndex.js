function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);        
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
window.onload = function() {
    var dataTemp = [];              
    var Chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true, 
        title: {
            text: "Temprature" 
        },                    
        axisX: {
            title: "chart updates every 2 secs" 
        },
        data: [{                  
                type: "line", // Chọn kiểu dữ liệu đường
                xValueType: "dateTime", // Cài đặt kiểu giá trị tại trục X là thuộc tính thời gian                            
                name: "temp",
                dataPoints: dataTemp // Dữ liệu hiển thị sẽ lấy từ dataTemp
            }                        
            ],
        });                
    var yTempVal = 0; 
    var updateInterval = 2000; 
    var time = new Date();     
    var updateChart = function() {
        httpGetAsync('chanel/get', function(data) { 
            var JData = JSON.parse(data);                                     
            document.getElementById("temp").value = JData[JData.length-1].value;
            console.log(JData);                                               
            time.setTime(time.getTime() + updateInterval);
            yTempVal = parseInt(JData[JData.length-1].value);                                            
            dataTemp.push({ 
                x: time.getTime(),
                y: yTempVal
            });                                            
            Chart.render(); 
        });
    };
    updateChart(); 
    setInterval(function() { 
        updateChart()
    }, updateInterval);
}