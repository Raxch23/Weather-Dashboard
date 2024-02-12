//get value of input when you user clicks search button
var searchBtn=document.getElementById("search")
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
    })
}
function getforcast(){}
function displayweather(data){
document.getElementById("weather").innerHTML=""
    var card=document.createElement("div")
    card.setAttribute("class", "card")

    var cardHeader =document.createElement("div")
    cardHeader.style.display="flex"
    cardHeader.style.flexDirection="row"

    var cardTitle =document.createElement("h2")
    cardTitle.textContent =data.name

    var dateDisplay =document.createElement("h2")
    dateDisplay.textContent=dayjs.unix(data.dt).format("(DD/MM/YYYY)")

    var temp=document.createElement("h4")
    temp.textContent="Temperature: "+data.main.temp

    var humidity=document.createElement("h4")
    humidity.textContent="Humidity: "+data.main.humidity

    var wind=document.createElement("h4")
    wind.textContent="Wind: "+data.wind.speed

    var image= document.createElement("img")
    image.setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")

    cardHeader.append(cardTitle, dateDisplay, image)

    card.appendChild(cardHeader)
    card.append(temp,humidity, wind )


    document.getElementById("weather").appendChild(card)
}
function displayforcast(){}
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