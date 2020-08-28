// Project by Jonathan Mutnick to use the Climacell data provider to display an hourly forecast
// Work in process
// testing a commit

import "/local/community/hourly-forecast/helpers/Chart.js"; 

class HourlyForecast extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'Hourly Forecast';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    // Global Variables
    const sunstatestr = hass.states[this.config.sun_object].state;
    const sunrisedt = new Date(hass.states[this.config.sun_object].attributes.next_rising);
    const sunsetdt = new Date(hass.states[this.config.sun_object].attributes.next_setting);
    const uiDateOptions = { hour: 'numeric', };  
    var Precip_state = new Array();
    var Precipprob_state = new Array();
    var Temp_state = new Array();
    var Humid_state = new Array()
    var Weather_state = new Array();
    var FeelsLikeTemp_state = new Array();
    var event = new Array();  
    var Hour = new Array();
  
    //  this is start of 0h
    Precip_state[0] = hass.states[this.config.entity + '_precipitation_0h'].state;
    Precipprob_state[0] = hass.states[this.config.entity + '_precipitation_probability_0h'].state;
    Temp_state[0] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_0h'].state)));
    Humid_state[0] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_0h'].state)));  
    Weather_state[0] = hass.states[this.config.entity + '_weather_condition_0h'].state;
    FeelsLikeTemp_state[0] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_0h'].state)));
    event[0] = new Date(hass.states[this.config.entity + '_temperature_0h'].attributes.observation_time);
    Hour[0] = event[0].toLocaleTimeString('en-US', uiDateOptions);  //do it
    
    //  this is start of 1h
    Precip_state[1] = hass.states[this.config.entity + '_precipitation_1h'].state;
    Precipprob_state[1] = hass.states[this.config.entity + '_precipitation_probability_1h'].state;
    Temp_state[1] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_1h'].state)));
    Humid_state[1] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_1h'].state)));  
    Weather_state[1] = hass.states[this.config.entity + '_weather_condition_1h'].state;
    FeelsLikeTemp_state[1] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_1h'].state)));
    event[1] = new Date(hass.states[this.config.entity + '_temperature_1h'].attributes.observation_time);
    Hour[1] = event[1].toLocaleTimeString('en-US', uiDateOptions);  //do it
    
    //  this is start of 2h
    Precip_state[2] = hass.states[this.config.entity + '_precipitation_2h'].state;
    Precipprob_state[2] = hass.states[this.config.entity + '_precipitation_probability_2h'].state;
    Temp_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_2h'].state)));
    Humid_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_2h'].state)));  
    Weather_state[2] = hass.states[this.config.entity + '_weather_condition_2h'].state;
    FeelsLikeTemp_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_2h'].state)));
    event[2] = new Date(hass.states[this.config.entity + '_temperature_2h'].attributes.observation_time);
    Hour[2] = event[2].toLocaleTimeString('en-US', uiDateOptions);  //do it

    //  this is start of 3h
    Precip_state[2] = hass.states[this.config.entity + '_precipitation_2h'].state;
    Precipprob_state[2] = hass.states[this.config.entity + '_precipitation_probability_2h'].state;
    Temp_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_temperature_2h'].state)));
    Humid_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_2h'].state)));  
    Weather_state[2] = hass.states[this.config.entity + '_weather_condition_2h'].state;
    FeelsLikeTemp_state[2] = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_2h'].state)));
    event[2] = new Date(hass.states[this.config.entity + '_temperature_2h'].attributes.observation_time);
    Hour[2] = event[2].toLocaleTimeString('en-US', uiDateOptions);  //do it
    
    var i;
    for (i=0; i< 4; i++) {    
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
    this.content.innerHTML = `
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
      <table cellspacing=0>
      <tr class="border_bottom"><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather_state[0]}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather_state[0]}</span>
          </div>
          ${Hour[0]}</td>
          <td style="text-align:center""> <div>${Temp_state[0]}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>Feels Like ${FeelsLikeTemp_state[0]}&degF</div>
                                         <div>${Humid_state[0]}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precipprob_state[0]}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip_state[0]} in/hr</div></td>
      </tr>
      <tr class="border_bottom"><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather_state[1]}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather_state[1]}</span>
          </div>
          ${Hour[1]}</td>
          <td style="text-align:center""> <div>${Temp_state[1]}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>${Humid_state[1]}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precipprob_state[1]} <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip_state[1]} in/hr</div></td>
      </tr>
      <tr class="border_bottom"><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather_state[2]}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather_state[2]}</span>
          </div>
         ${Hour[2]}</td>
          <td style="text-align:center""> <div>${Temp_state[2]}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>${Humid_state[2]}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precipprob_state[2]}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip_state[2]} in/hr</div></td>
      </tr>
      <tr><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather_state[3]}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather_state[3]}</span>
          </div>
          ${Hour[3]}</td>
          <td style="text-align:center""> <div>${Temp_state[3]}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>${Humid_state[3]}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precipprob_state[3]}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip_state[3]} in/hr</div></td>
      </tr>
</table> 
<br>

<!--
Graph below
<canvas id="myChart"></canvas>

  
<script>
var ctx = document.getElementById('myChart');
 
new Chart(ctx, {
  type: 'line',
  data: {
      labels: ["H0", "Hour1H", "Hour2H", "Hour3H"],
      datasets: [{
        label: 'Temperature F',
        data: [1,2,3,4],       
        borderWidth: 1,
	  fill: false
        }]
    },
    
});
</script>
-->
`;
//myChart.canvas.parentNode.style.height = '250px';
//myChart.canvas.parentNode.style.width = '500px';

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
