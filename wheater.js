var results_box = document.getElementById('search_city')
var submit_button = document.querySelector('.submit_btn')

// for getinng date and time
var current_date = new Date();
current_date = String(current_date);


// http://worldtimeapi.org/api/timezone

// for showing the wheater
submit_button.addEventListener('click', searching);

// functions
function searching() {
    results_box.style.boxShadow = '20px 20px 50px rgba(0, 0, 0, 0.5)';
    results_box.style.margin = '50px 50px';
    console.log('Welcome');

    // asscing the city inputed the search bar
    var city_name = document.getElementById('search_bar').value;
    console.log(city_name);

    // creating the  div for wheater details
    var new_whether_report = document.createElement('div')
    new_whether_report.className = 'Wheater_detail';

    // fetching api
    fetch(`${api_detail.baseUrl}?q=${city_name}&appid=${api_detail.key}&units=metric`)
        .then((res) => {
            console.log(res);
            return res.json()
        }).then((data) => {

            var details = data; 
            console.log(data);
            new_whether_report.innerHTML = `
        <div class="location">${data.name} , ${data.sys.country}</div>
        <div class="position">Log:${data.coord.lon} , Lat:${data.coord.lat}</div>
        <div class="date">${current_date.slice(0, 15)}</div>
        <div class="time">${current_date.slice(16, 25)}</div>
        <div class="temperature"><h1>${data.main.temp}&degC</h1></div>
        <div class="max_min">${data.main.temp_max}&degC(max) / ${data.main.temp_min}&degC(min)</div>
        <div class="humidity">Humidity:${data.main.humidity}</div>
        <div class="type">${data.weather[0].main}</div>
        `

            // logic for changing background image acc. to wheater

            // const wheater_codes = {
            //     Clouds    : 0,
            //     Clear     : 1,
            //     Rain      : 2,
            //     Lighting  : 3,
            //     Smoke     : 4,
            //     Fog       : 5,
            //     Mist      : 6,
            //     Haze      : 7
            // };
            //  array to store various images according to there codes
            var images = ['img/cloudy.jpg', 'img/clear.jpg', 'img/a-Rainy.jpg', 'img/a-lighting_1.jpg', 'img/a-smoke.jpg', 'img/a-Fog.jpg', 'img/a-mist.jpg', 'img/a-haze.jpg' ,'img/a-snow.jpg']

            var temp = data.weather[0].main;
            var code;
            // console.log(temp);
            switch (temp) 
            {
                case 'Clouds':  code = 0;  break;
                case 'Clear':  code = 1;  break;
                case 'Rain':  code = 2;  break;
                case 'Lighting':  code = 3;  break;
                case 'Smoke':  code = 4;  break;
                case 'Fog':  code = 5;  break;
                case 'Mist':  code = 6;  break;
                case 'Haze':  code = 7;  break;
                case 'Snow' : code = 8; break;
                default:    break;
            }

            // console.log(code);

            document.body.style.backgroundImage = `url('${images[code]}')`
            
            // inserting the wheater report
            // results_box.appendChild(new_whether_report);
            results_box.replaceChild(new_whether_report,document.querySelector('.Wheater_detail'));
            
        }).catch((err)=>{
            // console.log(err);
            // console.log(err.message);
            // console.log(err.type);
            // console.log(err.name);
            
            // Cannot read properties of undefined
            if(err.message === "Cannot read properties of undefined (reading 'country')"){
                new_whether_report.innerHTML = "<h2>Location Not Found</h2>"
            }
            else if(err.message ==="Failed to fetch"){
                new_whether_report.innerHTML = "<h2>Please Connect Internet</h2>";
            }
            results_box.replaceChild(new_whether_report,document.querySelector('.Wheater_detail'));
        })


}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const api_detail = {
    key: '6d169df17c3934c27b42999d4483ec6e',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};
