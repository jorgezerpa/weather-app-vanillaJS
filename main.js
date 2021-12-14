'use strict';

            //DOM elements
//big window
let lup= document.querySelector(".search");
let search_bar= document.getElementById("search-bar");
let country_to_search;

let big_window_temperature=document.querySelector(".big-window-temp");
let big_window_city= document.querySelector(".big-window-city");
let big_window_date=document.querySelector(".big-window-date");


//current card
// let current_card=document.getElementById(curr);




            //dinamic variables
let city_data;


            //open search bar
lup.addEventListener("click", ()=>{
    search_bar.style.visibility="visible";
})


            //searcher
search_bar.addEventListener("change",()=>{
    country_to_search=search_bar.value;
    console.log(country_to_search); 
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+country_to_search+"&limit=1&appid=08c76ae8a032cfda2404ed64d740eab7")
    .then(response=>response.json())
    .then(response=>{
        city_data=response;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+response[0].lat+"&lon="+response[0].lon+"&exclude={part}&appid=08c76ae8a032cfda2404ed64d740eab7")
            .then(response=> response.json())
            .then(response=>{
                console.log(response);
                big_window_temperature.innerHTML=parseInt(kelToCel( response.current.temp))+"°";
                big_window_city.innerHTML=city_data[0].name;
                big_window__date.innerHTML=getCurrentDate(response.current.dt);
            })
        .catch(err=>console.log(err));
    
    })
    .catch(err=>console.log(err))
})




                    //functions
function kelToCel(kelvin){
    return kelvin-273.15;
}


//if you want the hour use this function but modify it.
function getCurrentDate(unix){
    let current_date;
    return current_date= new Date(unix).toDateString().slice(0,10);
}








