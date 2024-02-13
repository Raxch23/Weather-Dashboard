//get value of input when you user clicks search button
var searchBtn=document.getElementById("search");
searchBtn.style.backgroundColor="#8BB8FD";
searchBtn.style.color="white";
var apikey="0951c140a5a0e650ef6526899053f896"
var pastCity=JSON.parse(localStorage.getItem("pastcity"))||[]
searchBtn.addEventListener("click",function(){
    var cityname=document.getElementById("city").value
    getcoords(cityname)
})
function getcoords(name){
    var geourl="http://api.openweathermap.org/geo/1.0/direct?q="+name+"&limit=5&appid="+apikey;
    fetch(geourl).then(function(response){
        return response.json()
    }).then(function(data){
        var lat=data[0].lat;
        var lon=data[0].lon;
        var cityname=data[0].name;
        if(pastCity.indexOf(cityname)===-1){
        pastCity.push(cityname)
        localStorage.setItem("pastcity", JSON.stringify(pastCity))
        buildmenu()
        }
        getweather(lat,lon)
    })
}
function getweather(lat,lon){
    var weatherurl="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+apikey
    fetch(weatherurl).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
       displayweather(data)
       getforecast(lat,lon)
    })
}
function getforecast(lat, lon){
    var weatherurl="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid="+apikey
    fetch(weatherurl).then(function(response){
        return response.json()
    }).then(function(data){
        var forecastArray=[]
        for(var i=0; i<data.list.length;i++){
        var timeofday=data.list[i].dt_txt.split(" ")[1]
        if(timeofday==="12:00:00"){
        forecastArray.push(data.list[i])
        }

        }
        displayforecast(forecastArray)
    })
}
function displayweather(data){
document.getElementById("weather").innerHTML=""
    var card=document.createElement("div")
    card.style.border="1px solid black"

    var cardHeader =document.createElement("div")
    cardHeader.style.display="flex"
    cardHeader.style.flexDirection="row"

    var cardTitle =document.createElement("h2")
    cardTitle.textContent =data.name

    var dateDisplay =document.createElement("h2")
    dateDisplay.textContent=dayjs.unix(data.dt).format("(DD/MM/YYYY)")

    var temp=document.createElement("h4")
    temp.textContent="Temp: "+Math.round(data.main.temp)+String.fromCharCode(176)+"C"

    var humidity=document.createElement("h4")
    humidity.textContent="Humidity: "+data.main.humidity+"%"

    var wind=document.createElement("h4")
    wind.textContent="Wind: "+data.wind.speed+" KPH"

    var image= document.createElement("img")
    image.setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png")

    cardHeader.append(cardTitle, dateDisplay, image)

    card.appendChild(cardHeader)
    card.append(temp,humidity, wind )


    document.getElementById("weather").appendChild(card)
}
function displayforecast(data){
    var rowTitle=document.getElementById("row-title")
    rowTitle.classList.remove("hide")
   document.getElementById("forecast").innerHTML=""
    for (var i=0; i<data.length;i++){
        var col=document.createElement("div")
        col.setAttribute("class", "test")
        
        //col.style.width="20%"
        var card=document.createElement("div")
        card.style.backgroundColor="#102B55"

        var dateDisplay =document.createElement("p")
        dateDisplay.textContent=dayjs.unix(data[i].dt).format("DD/MM/YYYY")
        dateDisplay.style.color="white";
        dateDisplay.style.fontWeight="bold";
        var temp=document.createElement("p")
    
        temp.textContent="Temp: "+Math.round(data [i].main.temp)+String.fromCharCode(176)+"C"
        temp.style.color="white";
        var image= document.createElement("img")
        image.setAttribute("src", "https://openweathermap.org/img/wn/"+data [i].weather[0].icon+".png")

        var humidity=document.createElement("p")
        humidity.textContent="Humidity: "+data [i].main.humidity+"%"
        humidity.style.color="white";

        var wind=document.createElement("p")
        wind.textContent="Wind: "+data [i].wind.speed+" KPH"
        wind.style.color="white";
        
    
        card.append(dateDisplay, image,temp, humidity, wind)
        col.append(card)
        document.getElementById("forecast").append(col)
    }
}
function buildmenu(){
    document.querySelector(".list-group").innerHTML=""
    for(var i=0;i<pastCity.length;i++){
        var cityButton=document.createElement("button")
        cityButton.textContent=pastCity[i]
        cityButton.setAttribute("class", "list-group-item")
        cityButton.setAttribute("value", pastCity[i])
        cityButton.addEventListener("click", function(event){
        getcoords(event.target.value)
        })
        document.querySelector(".list-group").append(cityButton)
    }
}
buildmenu()