// Project by Jonathan Mutnick to use the Climacell data provider to display an hourly forecast
// Work in process

import 'https://unpkg.com/chart.js@2.9.3/dist/Chart.min.js?module';

class HourlyForecast extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'Hourly Forecast';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
      console.log("%cHOURLY-FORECAST %cBETA", "color=white; background: blue;", "color=white; background: red;");
    }
	
    // Variables Defined from Config
    
    const sunstatestr = hass.states[this.config.sun_object].state;
    
    const sunrisedt = new Date(hass.states[this.config.sun_object].attributes.next_rising);
    const sunsetdt = new Date(hass.states[this.config.sun_object].attributes.next_setting);
    const numF = Number(this.config.hours) - 1;
    var graph = this.config.graph;
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
	var Precip, PrecipProb, Temp, Humid, Weather, FeelsLike, HourNum;
    var html1, event_state, x, l; 
  
    // Loop
   	for (l=0; l<= numF; l++) {
	    Precip = this.config.entity + '_precipitation_' + String(l) + 'h';
	    Precip_state[l] = hass.states[Precip].state;
    	
		PrecipProb = this.config.entity + '_precipitation_probability_' + String(l) + 'h';
		Precipprob_state[l] = hass.states[PrecipProb].state;
		
		Temp = this.config.entity + '_temperature_' + String(l) + 'h';
		Temp_state[l] = String(Math.round(Number(hass.states[Temp].state)));
		
		Humid = this.config.entity + '_humidity_percentage_' + String(l) + 'h';
		Humid_state[l] = String(Math.round(Number(hass.states[Humid].state)));  
		
		Weather = this.config.entity + '2_weather_condition_' + String(l) + 'h';
		Weather_state[l] = hass.states[Weather].state;
		
		FeelsLike = this.config.entity + '_feels_like_' + String(l) + 'h';
		FeelsLikeTemp_state[l] = String(Math.round(Number(hass.states[FeelsLike].state)));
		
		event_state = this.config.entity + '_temperature_' + String(l) + 'h';
     	event[l] = new Date(hass.states[event_state].attributes.observation_time);
    	Hour[l] = event[l].toLocaleTimeString('en-US', uiDateOptions);
 
 		if (Weather_state[l] == "clear" && sunstatestr == "above_horizon" && event[l] < sunsetdt) {Weather_state[l] = "clear_day";}
    		else if (Weather_state[l] == "clear" && sunstatestr == "above_horizon" && event[l] > sunsetdt) {Weather_state[l] = "clear_night";}
    		else if (Weather_state[l] == "clear" && sunstatestr == "below_horizon" && event[l] < sunrisedt) {Weather_state[l] = "clear_night";}
    		else if (Weather_state[l] == "clear" && sunstatestr == "below_horizon" && event[l] > sunrisedt) {Weather_state[l] = "clear_day";}  
    		else if (Weather_state[l] == "mostly_clear" && sunstatestr == "above_horizon" && event[l] < sunrisedt) {Weather_state[l] = "mostly_clear_day";}
    		else if (Weather_state[l] == "mostly_clear" && sunstatestr == "above_horizon" && event[l] > sunrisedt) {Weather_state[l] = "mostly_clear_night";}
    		else if (Weather_state[l] == "mostly_clear" && sunstatestr == "below_horizon" && event[l]  > sunsetdt) {Weather_state[l] = "mostly_clear_night";}
    		else if (Weather_state[l] == "mostly_clear" && sunstatestr == "below_horizon" && event[l]  < sunsetdt) {Weather_state[l] = "mostly_clear_day";}
    		else if (Weather_state[l] == "partly_cloudy" && sunstatestr == "above_horizon" && event[l] < sunrisedt) {Weather_state[l] = "partly_cloudy_day";}
    		else if (Weather_state[l] == "partly_cloudy" && sunstatestr == "above_horizon" && event[l] > sunrisedt) {Weather_state[l] = "partly_cloudy_night";}
    		else if (Weather_state[l] == "partly_cloudy" && sunstatestr == "below_horizon" && event[l]  > sunsetdt) {Weather_state[l] = "partly_cloudy_night";}
    		else if (Weather_state[l] == "partly_cloudy" && sunstatestr == "below_horizon" && event[l]  < sunsetdt) {Weather_state[l] = "partly_cloudy_day";}
		}

    //construct html
       
    html1 = `<body>    
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
    	html1 += `<div>Feels Like ${FeelsLike}&degF<IMG SRC="/local/community/hourly-forecast/icons/windchill.jpeg" align=center style="width:20px"></div>`;
     } 
     ;
          
     html1 += `<div>${Humid}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
               </td><td style="text-align:center"> <div>${PrecipProb}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
            <div>${Precip} in/hr</div></td></tr>`;
      };
      
html1 += `</table>
<div><canvas id="MyCanvas" width="100%"></canvas></div>
</body>`;

this.content.innerHTML = html1;

// document.getElementById('MyCanvas') returns NULL
console.log("Canvas: " + document.HTMLCanvasElement);
console.log("Active Element: " + document.activeElement);


//do this after the html has been established

// if (graph == true) {     
//       var ctx = document.getElementById('myChart');
// 	  new Chart(ctx, {
//         	type: 'line',
//         	data: {
//         		labels:['0h','1h','2h','3h','4h'],
//         		datasets: [{
//         			label:'Forecast Temps',
//         			data: [
//         				85,
//         				90,
//         				87,
//         				86,
//         				85],
//         			fill: false,
//         			}] 		
//         		}        
//         });   
// 		//document.body.appendChild(canvas);
//      };
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
