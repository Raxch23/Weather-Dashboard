//get value of input when you user clicks search button
var searchBtn=document.getElementById("search")
var apikey="0951c140a5a0e650ef6526899053f896"
searchBtn.addEventListener("click",function(){
    var cityname=document.getElementById("city").value
    console.log(cityname)
    getcoords(cityname)
})
function getcoords(name){
    console.log(name)
    var geourl="http://api.openweathermap.org/geo/1.0/direct?q="+name+"&limit=5&appid="+apikey;
    fetch(geourl).then(function(response){
        console.log(response)
        return response.json()
    }).then(function(data){
        console.log(data)
        var lat=data[0].lat;
        var lon=data[0].lon;
        var cityname=data[0].name;
        getweather(lat,lon)
    })
}
function getweather(lat,lon){
    console.log(lat,lon)
    var weatherurl="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+apikey
    fetch(weatherurl).then(function(response){
        console.log(response)
        return response.json()
    }).then(function(data){
        console.log(data)
       displayweather(data)
    })
}
function getforcast(){}
function displayweather(data){
    var card=document.createElement("div")
    card.setAttribute("class", "card")
    document.getElementById("weather").appendChild(card)
}
function displayforcast(){}
function buildmenu(){}