// Project by Jonathan Mutnick to use the Climacell data provider to display an hourly forecast
// Work in process

class HourlyForecast extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'Hourly Forecast';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
      console.info("%cHOURLY-FORECAST", "color=blue, background=white");

    }

	
    // Variables Defined from Config
    
    const sunstatestr = hass.states[this.config.sun_object].state;
    const sunrisedt = new Date(hass.states[this.config.sun_object].attributes.next_rising);
    const sunsetdt = new Date(hass.states[this.config.sun_object].attributes.next_setting);
    const graph = this.config.graph;
    //console.log("HOURLY FORECAST: graph=" + graph);
    
    // Variable Declarations
    const uiDateOptions = { hour: 'numeric', };  
	var Precip_state = new Array();
	var Precipprob_state = new Array();
	var Temp_state = new Array();
	var Humid_state = new Array()
	var Weather_state = new Array();
	var FeelsLikeTemp_state = new Array();
	var event = new Array();  
	var Hour = new Array();
	var numF=4;
	var html1;
	var Precip, PrecipProb, Temp, Humid, Weather, FeelsLike, HourNum;
    
    
    //  this is start of 0h
    Precip_state[0] = hass.states[this.config.entity + '_precipitation_0h'].state;
    Precipprob_state[0] = hass.states[this.config.entity + '_precipitation_probability_0h'].state;
    Temp_state[0] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_0h'].state)));
    Humid_state[0] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_0h'].state)));  
    Weather_state[0] = hass.states[this.config.entity + '2_weather_condition_0h'].state;
    FeelsLikeTemp_state[0] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_0h'].state)));
    event[0] = new Date(hass.states[this.config.entity + '_temperature_0h'].attributes.observation_time);
    Hour[0] = event[0].toLocaleTimeString('en-US', uiDateOptions);
    
    //  this is start of 1h
    Precip_state[1] = hass.states[this.config.entity + '_precipitation_1h'].state;
    Precipprob_state[1] = hass.states[this.config.entity + '_precipitation_probability_1h'].state;
    Temp_state[1] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_1h'].state)));
    Humid_state[1] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_1h'].state)));  
    Weather_state[1] = hass.states[this.config.entity + '2_weather_condition_1h'].state;
    FeelsLikeTemp_state[1] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_1h'].state)));
    event[1] = new Date(hass.states[this.config.entity + '_temperature_1h'].attributes.observation_time);
    Hour[1] = event[1].toLocaleTimeString('en-US', uiDateOptions);
    
    //  this is start of 2h
    Precip_state[2] = hass.states[this.config.entity + '_precipitation_2h'].state;
    Precipprob_state[2] = hass.states[this.config.entity + '_precipitation_probability_2h'].state;
    Temp_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_2h'].state)));
    Humid_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_2h'].state)));  
    Weather_state[2] = hass.states[this.config.entity + '2_weather_condition_2h'].state;
    FeelsLikeTemp_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_2h'].state)));
    event[2] = new Date(hass.states[this.config.entity + '_temperature_2h'].attributes.observation_time);
    Hour[2] = event[2].toLocaleTimeString('en-US', uiDateOptions);

    //  this is start of 3h
    Precip_state[3] = hass.states[this.config.entity + '_precipitation_3h'].state;
    Precipprob_state[3] = hass.states[this.config.entity + '_precipitation_probability_3h'].state;
    Temp_state[3] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_3h'].state)));
    Humid_state[3] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_3h'].state)));  
    Weather_state[3] = hass.states[this.config.entity + '2_weather_condition_3h'].state;
    FeelsLikeTemp_state[3] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_3h'].state)));
    event[3] = new Date(hass.states[this.config.entity + '_temperature_3h'].attributes.observation_time);
    Hour[3] = event[3].toLocaleTimeString('en-US', uiDateOptions);

    //  this is start of 4h
    Precip_state[4] = hass.states[this.config.entity + '_precipitation_4h'].state;
    Precipprob_state[4] = hass.states[this.config.entity + '_precipitation_probability_4h'].state;
    Temp_state[4] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_4h'].state)));
    Humid_state[4] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_4h'].state)));  
    Weather_state[4] = hass.states[this.config.entity + '2_weather_condition_4h'].state;
    FeelsLikeTemp_state[4] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_4h'].state)));
    event[4] = new Date(hass.states[this.config.entity + '_temperature_4h'].attributes.observation_time);
    Hour[4] = event[4].toLocaleTimeString('en-US', uiDateOptions);
    
    
    var i;
    for (i=0; i<= numF; i++) {    
    if (Weather_state[i] == "clear" && sunstatestr == "above_horizon" && event[i] < sunsetdt) {Weather_state[i] = "clear_day";}
    else if (Weather_state[i] == "clear" && sunstatestr == "above_horizon" && event[i] > sunsetdt) {Weather_state[i] = "clear_night";}
    else if (Weather_state[i] == "clear" && sunstatestr == "below_horizon" && event[i] < sunrisedt) {Weather_state[i] = "clear_night";}
    else if (Weather_state[i] == "clear" && sunstatestr == "below_horizon" && event[i] > sunrisedt) {Weather_state[i] = "clear_day";}  
    else if (Weather_state[i] == "mostly_clear" && sunstatestr == "above_horizon" && event[i] < sunrisedt) {Weather_state[i] = "mostly_clear_day";}
    else if (Weather_state[i] == "mostly_clear" && sunstatestr == "above_horizon" && event[i] > sunrisedt) {Weather_state[i] = "mostly_clear_night";}
    else if (Weather_state[i] == "mostly_clear" && sunstatestr == "below_horizon" && event[i]  > sunsetdt) {Weather_state[i] = "mostly_clear_night";}
    else if (Weather_state[i] == "mostly_clear" && sunstatestr == "below_horizon" && event[i]  < sunsetdt) {Weather_state[i] = "mostly_clear_day";}
    else if (Weather_state[i] == "partly_cloudy" && sunstatestr == "above_horizon" && event[i] < sunrisedt) {Weather_state[i] = "partly_cloudy_day";}
    else if (Weather_state[i] == "partly_cloudy" && sunstatestr == "above_horizon" && event[i] > sunrisedt) {Weather_state[i] = "partly_cloudy_night";}
    else if (Weather_state[i] == "partly_cloudy" && sunstatestr == "below_horizon" && event[i]  > sunsetdt) {Weather_state[i] = "partly_cloudy_night";}
    else if (Weather_state[i] == "partly_cloudy" && sunstatestr == "below_horizon" && event[i]  < sunsetdt) {Weather_state[i] = "partly_cloudy_day";}
    }
        
    //construct html
    
    if (graph === 'true') {
      html1 += `
      <head>
      	<script src="/local/community/hourly-forecast/helpers/Chart.js"></script>
      </head>`
    }
    
    html1 += `
<style>
.tooltip {
  position: bottom;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

table {width: 100%}

tr.border_bottom  td{
  border-bottom: 1px solid white;
}

</style>
      <table cellspacing=0>`;
  
  var x;        
  for (x=0; x <= numF; x++) { 
    Weather = Weather_state[x];
    HourNum = Hour[x];
    Temp = Temp_state[x];
    FeelsLike = FeelsLikeTemp_state[x];
    Humid = Humid_state[x];
    Precip = Precip_state[x];
    PrecipProb = Precipprob_state[x];
    
    if (x < numF) {
    	html1 += `<tr class="border_bottom">`;
    	}
    else {
    	html1 += `<tr>`;}
    
    html1 += `<td style="text-align:center">`;
    html1 += `<div class="tooltip"><IMG SRC="/local/community/hourly-forecast/icons/${Weather}.svg" width=50 height=50><span class="tooltiptext">${Weather}</span></div>`
    html1 += `${HourNum}</td>
     <td style="text-align:center"">
     <div>${Temp}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>`;
     
     if (FeelsLike > Temp) {
	 	html1 += `<div>Feels Like ${FeelsLike}&degF<IMG SRC="/local/community/hourly-forecast/icons/heatindex.png" align=center style="width:20px"></div>`;
     }
     else if (FeelsLike < Temp) {
    	html1 += `<div>Feels Like ${FeelsLike}&degF<IMG SRC="/local/community/hourly-forecast/icons/WindChill.jpeg" align=center style="width:20px"></div>`;
     } 
     ;
          
     html1 += `<div>${Humid}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
               </td><td style="text-align:center"> <div>${PrecipProb}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
            <div>${Precip} in/hr</div></td></tr>`;
      };
      
html1 += `</table>`;

if (graph === 'true') {
      html1 += `
      <div>
      	<canvas id="canvas"></canvas>
      </div>
      <script>
        var config = {
        	type: 'line',
        	data: {
        		labels:['0h','1h','2h','3h','4h'],
        		datasets: [{
        			label:'Forecast Temps',
        			backgroundColor: window.chartColors.red,
        			borderColor: window.chartColors.red,
        			data: [
        				85,
        				90,
        				87,
        				86,
        				85],
        			fill: false,
        			}] 		
        		}        
        }
        window.onload = function() {
        	var ctx = document.getElementById('canvas').getContext('2d');
        	window.myLine = new Chart(ctx, config);};
      
      </script>`
    }

console.info(html1);

this.content.innerHTML = html1;

  }

  //make sure an entity is set
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define a weather entity');
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('hourly-forecast', HourlyForecast);
