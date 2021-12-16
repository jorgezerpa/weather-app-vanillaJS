'use strict';

            //DOM elements
let lup= document.querySelector(".search");
let search_bar= document.getElementById("search-bar");
let country_to_search;

            //big-window
let big_window_temperature=document.querySelector(".big-window-temp");
let big_window_city= document.querySelector(".big-window-city");
let big_window_date=document.querySelector(".big-window-date");

            //today-card
let today_card_temperature=document.querySelector(".today-card-temperature");
let today_card_rain_prob=document.querySelector(".today-card-rain-prob");
let today_card_humidity=document.querySelector(".today-card-humidity");
let today_card_wing=document.querySelector(".today-card-wing");

            //yesterday-card
let yesterday_card_temperature=document.querySelector(".yesterday-card-temperature") ;
let yesterday_card_rain_prob=document.querySelector(".yesterday-card-rain-prob");
let yesterday_card_humidity=document.querySelector(".yesterday-card-humidity");
let yesterday_card_wing=document.querySelector(".yesterday-card-wing");

            //tomorrow-card
let tomorrow_card_temperature=document.querySelector(".tomorrow-card-temperature") ;
let tomorrow_card_rain_prob=document.querySelector(".tomorrow-card-rain-prob");
let tomorrow_card_humidity=document.querySelector(".tomorrow-card-humidity");
let tomorrow_card_wing=document.querySelector(".tomorrow-card-wing");

            //dinamic variables
let city_data;
let yesterday_date;


            //open search bar
lup.addEventListener("click", ()=>{
    search_bar.style.visibility="visible";
})


            //searcher
search_bar.addEventListener("change",()=>{
    country_to_search=search_bar.value;
            //get geographic data of the searched place
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+country_to_search+"&limit=1&appid=08c76ae8a032cfda2404ed64d740eab7")
    .then(response=>response.json())
    .then(response=>{
        city_data=response;
        console.log(city_data)
            //get current and forecast Info 
       return  fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+response[0].lat+"&lon="+response[0].lon+"&exclude={part}&appid=08c76ae8a032cfda2404ed64d740eab7")
            .then(response=> response.json())
            .then(response=>{
                        //big window
                big_window_city.innerHTML=city_data[0].name;
                big_window_temperature.innerHTML=parseInt(kelToCel( response.current.temp))+"°";
                big_window_date.innerHTML=getCurrentDate(response.current.dt);

                        //today info
                today_card_temperature.innerHTML=parseInt(kelToCel( response.current.temp))+"°";
                today_card_rain_prob.innerHTML=response.hourly[0].pop;
                today_card_humidity.innerHTML=response.current.humidity;
                today_card_wing.innerHTML=response.current.wind_speed;

                        //tomorrow info
                tomorrow_card_temperature.innerHTML=parseInt(kelToCel(response.daily[1].temp.day))+"°";
                tomorrow_card_rain_prob.innerHTML=response.daily[1].pop;
                tomorrow_card_humidity.innerHTML= response.daily[1].humidity;
                tomorrow_card_wing.innerHTML=response.daily[1].wind_speed;
                return response;
            })
        .catch(err=>console.log(err)) 
    })
                        //yesterday info
    .then(response=>{
        yesterday_date=response.current.dt-19000;
        fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${city_data[0].lat}&lon=${city_data[0].lon}&dt=1639454400&appid=08c76ae8a032cfda2404ed64d740eab7`)
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
                yesterday_card_temperature.innerHTML=parseInt(kelToCel(response.current.temp))+"°";
                yesterday_card_rain_prob.innerHTML=Object.values(response.current.rain)[0];
                yesterday_card_humidity.innerHTML= response.current.humidity;
                yesterday_card_wing.innerHTML=response.current.wind_speed;
            });
    })
    .catch(err=>console.log(err))
})




                    //functions
function kelToCel(kelvin){
    return kelvin-273.15;
}


//if you want the hour use this function but modify it.
function getCurrentDate(unix){
    unix=unix*1000;
    return new Date(unix).toDateString().slice(0,10);
}

