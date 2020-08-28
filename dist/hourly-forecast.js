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
    
    //console.log(hass.services.async_call.get_theme);
    
    //get sun position
    //const sunpos = this.config.sun_object;
    const sunstate = hass.states[this.config.sun_object];
    const sunstatestr = sunstate ? sunstate.state : 'unavailable';
    
    //time of next sunrise
    const sunrisedt = new Date(hass.states[this.config.sun_object].attributes.next_rising);
    
    //time of next sunset
    const sunsetdt = new Date(hass.states[this.config.sun_object].attributes.next_setting);
    
    // date format
    const uiDateOptions = { hour: 'numeric', };  
  
    // populate all variables from sensors
    
    //  this is start of 0h
    const Precip0h_state = hass.states[this.config.entity + '_precipitation_0h'].state;
    const Precip0hprob_state = hass.states[this.config.entity + '_precipitation_probability_0h'].state;
    const Temp0h_state = String(Math.round(Number(hass.states[this.config.entity + '_temperature_0h'].state)));
    const Humid0h_state = String(Math.round(Number(hass.states[this.config.entity + '_humidity_percentage_0h'].state)));  
    const event0 = Date(hass.states[this.config.entity + '_temperature_0h'].attributes.observation_time);
    const Weather0h_state = hass.states[this.config.entity + '_weather_condition_0h'].state;
    const FeelsLikeTemp0h_state = String(Math.round(Number(hass.states[this.config.entity + '_feels_like_0h'].state)));

     //time of forecast
    const Hour0H = event0.toLocaleTimeString('en-US', uiDateOptions);  //do it
        
    //weather condition    
    if (Weather0h_state == "clear" && sunstatestr == "above_horizon" && event0 < sunsetdt) {Weather0h_state = "clear_day";}
    else if (Weather0h_state == "clear" && sunstatestr == "above_horizon" && event0 > sunsetdt) {Weather0h_state = "clear_night";}
    else if (Weather0h_state == "clear" && sunstatestr == "below_horizon" && event0 < sunrisedt) {Weather0h_state = "clear_night";}
    else if (Weather0h_state == "clear" && sunstatestr == "below_horizon" && event0 > sunrisedt) {Weather0h_state = "clear_day";}  
    else if (Weather0h_state == "mostly_clear" && sunstatestr == "above_horizon" && event0 < sunrisedt) {Weather0h_state = "mostly_clear_day";}
    else if (Weather0h_state == "mostly_clear" && sunstatestr == "above_horizon" && event0 > sunrisedt) {Weather0h_state = "mostly_clear_night";}
    else if (Weather0h_state == "mostly_clear" && sunstatestr == "below_horizon" && event0  > sunsetdt) {Weather0h_state = "mostly_clear_night";}
    else if (Weather0h_state == "mostly_clear" && sunstatestr == "below_horizon" && event0  < sunsetdt) {Weather0h_state = "mostly_clear_day";}
    else if (Weather0h_state == "partly_cloudy" && sunstatestr == "above_horizon" && event0 < sunrisedt) {Weather0h_state = "partly_cloudy_day";}
    else if (Weather0h_state == "partly_cloudy" && sunstatestr == "above_horizon" && event0 > sunrisedt) {Weather0h_state = "partly_cloudy_night";}
    else if (Weather0h_state == "partly_cloudy" && sunstatestr == "below_horizon" && event0  > sunsetdt) {Weather0h_state = "partly_cloudy_night";}
    else if (Weather0h_state == "partly_cloudy" && sunstatestr == "below_horizon" && event0  < sunsetdt) {Weather0h_state = "partly_cloudy_day";}
    
    // this is end of 0h
    
    // begin 1h
    //precip 
    const Precip1h = this.config.entity + '_precipitation_1h';
    const Precip1h_state = hass.states[Precip1h];
    const Precip1h_stateStr = Precip1h_state ? Precip1h_state.state : 'unavailable';
   
    //precip prob
    const Precip1hprob = this.config.entity + '_precipitation_probability_1h';
    const Precip1hprob_state = hass.states[Precip1hprob];
    const Precip1hprob_stateStr = Precip1hprob_state ? Precip1hprob_state.state : 'unavailable';
   
     //temperature
    const Temp1h = this.config.entity + '_temperature_1h';
    const Temp1h_state = hass.states[Temp1h];
    var Temp1h_stateStr = Temp1h_state ? Temp1h_state.state : 'unavailable';
    Temp1h_stateStr = String(Math.round(Number(Temp1h_stateStr)));
    
    //humidity
    const Humid1h_state = hass.states[this.config.entity + '_humidity_percentage_1h']  
    var Humid1hstr = Humid1h_state ? Humid1h_state.state : 'unavailable';
    Humid1hstr = String(Math.round(Number(Humid1hstr))); 
    
    //time of forecast
    const My1hDateTimeStr = hass.states[Precip1h].attributes.observation_time;
    const event1 = new Date(My1hDateTimeStr);  //convert to date, didn't need to use the ${} 
    const Hour1H = event1.toLocaleTimeString('en-US', uiDateOptions);  //do it 
    
    //weather condition
    const Weather1h = this.config.entity + '_weather_condition_1h';
    const Weather1h_state = hass.states[Weather1h];
    var Weather1h_stateStr = Weather1h_state ? Weather1h_state.state : 'unavailable';
    
    if (Weather1h_stateStr == "clear" && sunstatestr == "above_horizon" && event1 < sunsetdt) {
       Weather1h_stateStr = "clear_day";
    }
    else if (Weather1h_stateStr == "clear" && sunstatestr == "above_horizon" && event1 > sunsetdt) {
       Weather1h_stateStr = "clear_night";
    }
    else if (Weather1h_stateStr == "clear" && sunstatestr == "below_horizon" && event1 < sunrisedt) {
      Weather1h_stateStr = "clear_night";
    }
    else if (Weather1h_stateStr == "clear" && sunstatestr == "below_horizon" && event1 > sunrisedt) {
      Weather1h_stateStr = "clear_day";
    }  
    else if (Weather1h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event1 < sunrisedt) {
      Weather1h_stateStr = "mostly_clear_day";
    }
      else if (Weather1h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event1 > sunrisedt) {
      Weather1h_stateStr = "mostly_clear_night";
    }
    else if (Weather1h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event1  > sunsetdt) {
      Weather1h_stateStr = "mostly_clear_night";
    }
    else if (Weather1h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event1  < sunsetdt) {
      Weather1h_stateStr = "mostly_clear_day";
    }
    else if (Weather1h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event1 < sunrisedt) {
      Weather1h_stateStr = "partly_cloudy_day";
    }
      else if (Weather1h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event1 > sunrisedt) {
      Weather1h_stateStr = "partly_cloudy_night";
    }
    else if (Weather1h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event1  > sunsetdt) {
      Weather1h_stateStr = "partly_cloudy_night";
    }
    else if (Weather1h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event1  < sunsetdt) {
      Weather1h_stateStr = "partly_cloudy_day";
    }
    
 
    //end 1h

        // begin 2h
    //precip 
    const Precip2h = this.config.entity + '_precipitation_2h';
    const Precip2h_state = hass.states[Precip2h];
    const Precip2h_stateStr = Precip2h_state ? Precip2h_state.state : 'unavailable';
   
    //precip prob
    const Precip2hprob = this.config.entity + '_precipitation_probability_2h';
    const Precip2hprob_state = hass.states[Precip2hprob];
    const Precip2hprob_stateStr = Precip2hprob_state ? Precip2hprob_state.state : 'unavailable';
   
     //temperature
    const Temp2h = this.config.entity + '_temperature_2h';
    const Temp2h_state = hass.states[Temp2h];
    var Temp2h_stateStr = Temp2h_state ? Temp2h_state.state : 'unavailable';
    Temp2h_stateStr = String(Math.round(Number(Temp2h_stateStr)));
    
    //humidity
    const Humid2h_state = hass.states[this.config.entity + '_humidity_percentage_2h']  
    var Humid2hstr = Humid2h_state ? Humid2h_state.state : 'unavailable';
    Humid2hstr = String(Math.round(Number(Humid2hstr))); 
    
    //time of forecast
    const My2hDateTimeStr = hass.states[Precip2h].attributes.observation_time;
    const event2 = new Date(My2hDateTimeStr);  //convert to date, didn't need to use the ${} 
    const Hour2H = event2.toLocaleTimeString('en-US', uiDateOptions);  //do it 
    
    //weather condition
    const Weather2h = this.config.entity + '_weather_condition_2h';
    const Weather2h_state = hass.states[Weather2h];
    var Weather2h_stateStr = Weather2h_state ? Weather2h_state.state : 'unavailable';
    
    if (Weather2h_stateStr == "clear" && sunstatestr == "above_horizon" && event2 < sunsetdt) {
       Weather2h_stateStr = "clear_day";
    }
    else if (Weather2h_stateStr == "clear" && sunstatestr == "above_horizon" && event2 > sunsetdt) {
       Weather2h_stateStr = "clear_night";
    }
    else if (Weather2h_stateStr == "clear" && sunstatestr == "below_horizon" && event2 < sunrisedt) {
      Weather2h_stateStr = "clear_night";
    }
    else if (Weather2h_stateStr == "clear" && sunstatestr == "below_horizon" && event2 > sunrisedt) {
      Weather2h_stateStr = "clear_day";
    }  
    else if (Weather2h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event2 < sunrisedt) {
      Weather2h_stateStr = "mostly_clear_day";
    }
      else if (Weather2h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event2 > sunrisedt) {
      Weather2h_stateStr = "mostly_clear_night";
    }
    else if (Weather2h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event2  > sunsetdt) {
      Weather2h_stateStr = "mostly_clear_night";
    }
    else if (Weather2h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event2  < sunsetdt) {
      Weather2h_stateStr = "mostly_clear_day";
    }
           else if (Weather2h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event2 < sunrisedt) {
      Weather2h_stateStr = "partly_cloudy_day";
    }
      else if (Weather2h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event2 > sunrisedt) {
      Weather2h_stateStr = "partly_cloudy_night";
    }
    else if (Weather2h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event2  > sunsetdt) {
      Weather2h_stateStr = "partly_cloudy_night";
    }
    else if (Weather2h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event2  < sunsetdt) {
      Weather2h_stateStr = "partly_cloudy_day";
    }
 
    //end 2h

    
    // begin 3h
    //precip 
    const Precip3h = this.config.entity + '_precipitation_3h';
    const Precip3h_state = hass.states[Precip3h];
    const Precip3h_stateStr = Precip3h_state ? Precip3h_state.state : 'unavailable';
   
    //precip prob
    const Precip3hprob = this.config.entity + '_precipitation_probability_3h';
    const Precip3hprob_state = hass.states[Precip3hprob];
    const Precip3hprob_stateStr = Precip3hprob_state ? Precip3hprob_state.state : 'unavailable';
   
     //temperature
    const Temp3h = this.config.entity + '_temperature_3h';
    const Temp3h_state = hass.states[Temp3h];
    var Temp3h_stateStr = Temp3h_state ? Temp3h_state.state : 'unavailable';
    Temp3h_stateStr = String(Math.round(Number(Temp3h_stateStr)));
    
    //humidity
    const Humid3h_state = hass.states[this.config.entity + '_humidity_percentage_3h']  
    var Humid3hstr = Humid3h_state ? Humid3h_state.state : 'unavailable';
    Humid3hstr = String(Math.round(Number(Humid3hstr))); 
    
    //time of forecast
    const My3hDateTimeStr = hass.states[Precip3h].attributes.observation_time;
    const event3 = new Date(My3hDateTimeStr);  //convert to date, didn't need to use the ${} 
    const Hour3H = event3.toLocaleTimeString('en-US', uiDateOptions);  //do it  
    
    //weather condition
    const Weather3h = this.config.entity + '_weather_condition_3h';
    const Weather3h_state = hass.states[Weather3h];
    var Weather3h_stateStr = Weather3h_state ? Weather3h_state.state : 'unavailable';
    
    if (Weather3h_stateStr == "clear" && sunstatestr == "above_horizon" && event3 < sunsetdt) {
       Weather3h_stateStr = "clear_day";
    }
    else if (Weather3h_stateStr == "clear" && sunstatestr == "above_horizon" && event3 > sunsetdt) {
       Weather3h_stateStr = "clear_night";
    }
    else if (Weather3h_stateStr == "clear" && sunstatestr == "below_horizon" && event3 < sunrisedt) {
      Weather3h_stateStr = "clear_night";
    }
    else if (Weather3h_stateStr == "clear" && sunstatestr == "below_horizon" && event3 > sunrisedt) {
      Weather3h_stateStr = "clear_day";
    }  
    else if (Weather3h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event3 < sunrisedt) {
      Weather3h_stateStr = "mostly_clear_day";
    }
      else if (Weather3h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event3 > sunrisedt) {
      Weather3h_stateStr = "mostly_clear_night";
    }
    else if (Weather3h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event3  > sunsetdt) {
      Weather3h_stateStr = "mostly_clear_night";
    }
    else if (Weather3h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event3  < sunsetdt) {
      Weather3h_stateStr = "mostly_clear_day";
    }
            else if (Weather3h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event3 < sunrisedt) {
      Weather3h_stateStr = "partly_cloudy_day";
    }
      else if (Weather3h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event3 > sunrisedt) {
      Weather3h_stateStr = "partly_cloudy_night";
    }
    else if (Weather3h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event3  > sunsetdt) {
      Weather3h_stateStr = "partly_cloudy_night";
    }
    else if (Weather3h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event3  < sunsetdt) {
      Weather3h_stateStr = "partly_cloudy_day";
    }
    
    //end 3h
    
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
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather0h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather0h_stateStr}</span>
          </div>
          ${Hour0H}</td>
          <td style="text-align:center""> <div>${Temp0h_state}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>Feels Like ${FeelsLikeTemp0h_state}&degF</div>
                                         <div>${Humid0h_state}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precip0hprob_state}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip0h_state} in/hr</div></td>
      </tr>
      <tr class="border_bottom"><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather1h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather1h_stateStr}</span>
          </div>
          ${Hour1H}</td>
          <td style="text-align:center""> <div>${Temp1h_stateStr}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>${Humid1hstr}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precip1hprob_stateStr}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip1h_stateStr} in/hr</div></td>
      </tr>
      <tr class="border_bottom"><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather2h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather2h_stateStr}</span>
          </div>
         ${Hour2H}</td>
          <td style="text-align:center""> <div>${Temp2h_stateStr}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>${Humid2hstr}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precip2hprob_stateStr}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip2h_stateStr} in/hr</div></td>
      </tr>
      <tr><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather3h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather3h_stateStr}</span>
          </div>
          ${Hour3H}</td>
          <td style="text-align:center""> <div>${Temp3h_stateStr}&degF<IMG SRC="/local/community/hourly-forecast/icons/temperature.png" align=center style="width:20px"></div>
                                         <div>${Humid3hstr}%<img SRC="/local/community/hourly-forecast/icons/humidity.png" align=center style="width:20px"></div>
          </td>
          <td style="text-align:center"> <div>${Precip3hprob_stateStr}% <img src="/local/community/hourly-forecast/icons/rain.png" align=center style="width:20px"></div>
                                        <div>${Precip3h_stateStr} in/hr</div></td>
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
