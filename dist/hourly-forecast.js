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
    }
    
    //get sun position
    const sunpos = this.config.sun_object;
    const sunstate = hass.states[sunpos];
    const sunstatestr = sunstate ? sunstate.state : 'unavailable';
    
    //time of next sunrise
    const sunrisedt = new Date(hass.states[sunpos].attributes.next_rising);
    
    //time of next sunset
    const sunsetdt = new Date(hass.states[sunpos].attributes.next_setting);
    
    // date format
    const uiDateOptions = { hour: 'numeric', };  
  
    //  this is start of 0h
    
    //precip 
    const Precip0h = this.config.entity + '_precipitation_0h';
    const Precip0h_state = hass.states[Precip0h];
    const Precip0h_stateStr = Precip0h_state ? Precip0h_state.state : 'unavailable';
   
    //precip prob
    const Precip0hprob = this.config.entity + '_precipitation_probability_0h';
    const Precip0hprob_state = hass.states[Precip0hprob];
    const Precip0hprob_stateStr = Precip0hprob_state ? Precip0hprob_state.state : 'unavailable';
   
     //temperature
    const Temp0h = this.config.entity + '_temperature_0h';
    const Temp0h_state = hass.states[Temp0h];
    const Temp0h_stateStr = Temp0h_state ? Temp0h_state.state : 'unavailable';
  
     //time of forecast
    const My0hDateTimeStr = hass.states[Precip0h].attributes.observation_time;
    const event0 = new Date(My0hDateTimeStr);  //convert to date, didn't need to use the ${} 
    const Hour0H = event0.toLocaleTimeString('en-US', uiDateOptions);  //do it
    
    
    //weather condition
    const Weather0h = this.config.entity + '_weather_condition_0h';
    const Weather0h_state = hass.states[Weather0h];
    var Weather0h_stateStr = Weather0h_state ? Weather0h_state.state : 'unavailable';
    
    if (Weather0h_stateStr == "clear" && sunstatestr == "above_horizon" && event0 < sunsetdt) {
       Weather0h_stateStr = "clear_day";
    }
    else if (Weather0h_stateStr == "clear" && sunstatestr == "above_horizon" && event0 > sunsetdt) {
       Weather0h_stateStr = "clear_night";
    }
    else if (Weather0h_stateStr == "clear" && sunstatestr == "below_horizon" && event0 < sunrisedt) {
      Weather0h_stateStr = "clear_night";
    }
    else if (Weather0h_stateStr == "clear" && sunstatestr == "below_horizon" && event0 > sunrisedt) {
      Weather0h_stateStr = "clear_day";
    }  
    else if (Weather0h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event0 < sunrisedt) {
      Weather0h_stateStr = "mostly_clear_day";
    }
      else if (Weather0h_stateStr == "mostly_clear" && sunstatestr == "above_horizon" && event0 > sunrisedt) {
      Weather0h_stateStr = "mostly_clear_night";
    }
    else if (Weather0h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event0  > sunsetdt) {
      Weather0h_stateStr = "mostly_clear_night";
    }
    else if (Weather0h_stateStr == "mostly_clear" && sunstatestr == "below_horizon" && event0  < sunsetdt) {
      Weather0h_stateStr = "mostly_clear_day";
    }
       else if (Weather0h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event0 < sunrisedt) {
      Weather0h_stateStr = "partly_cloudy_day";
    }
      else if (Weather0h_stateStr == "partly_cloudy" && sunstatestr == "above_horizon" && event0 > sunrisedt) {
      Weather0h_stateStr = "partly_cloudy_night";
    }
    else if (Weather0h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event0  > sunsetdt) {
      Weather0h_stateStr = "partly_cloudy_night";
    }
    else if (Weather0h_stateStr == "partly_cloudy" && sunstatestr == "below_horizon" && event0  < sunsetdt) {
      Weather0h_stateStr = "partly_cloudy_day";
    }
    
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
    const Temp1h_stateStr = Temp1h_state ? Temp1h_state.state : 'unavailable';
    
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
    const Temp2h_stateStr = Temp2h_state ? Temp2h_state.state : 'unavailable';
    
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
    const Temp3h_stateStr = Temp3h_state ? Temp3h_state.state : 'unavailable';

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
    
    //console.log("Weather3h_stateStr=" + Weather3h_stateStr);
    //console.log("sunstatestr=" + sunstatestr);
    //console.log("event3=" + event3);
    //console.log("sunrisedt=" + sunrisedt);
    //console.log("sunsetdt=" + sunsetdt);
    
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

</style>
      <table border=1>
      <tr><th>Condition/Time</th><th>Temp</th><th>Rain Probability</th><th>Precipitation</th></tr>
      <tr><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather0h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather0h_stateStr}</span>
          </div>
          ${Hour0H}</td>
          <td style="text-align:center"> ${Temp0h_stateStr} F</td>
          <td style="text-align:center"> ${Precip0hprob_stateStr} % </td>
          <td style="text-align:center">${Precip0h_stateStr} in/hr</td>
      </tr>
      <tr><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather1h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather1h_stateStr}</span>
          </div>
          ${Hour1H}</td>
          <td style="text-align:center"> ${Temp1h_stateStr} F</td>
          <td style="text-align:center"> ${Precip1hprob_stateStr} % </td>
          <td style="text-align:center">${Precip1h_stateStr} in/hr</td>
      </tr>
      <tr><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather2h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather2h_stateStr}</span>
          </div>
         ${Hour2H}</td>
          <td style="text-align:center"> ${Temp2h_stateStr} F</td>
          <td style="text-align:center"> ${Precip2hprob_stateStr} % </td>
          <td style="text-align:center">${Precip2h_stateStr} in/hr</td>
      </tr>
      <tr><td style="text-align:center">
          <div class="tooltip">
            <IMG SRC="/local/community/hourly-forecast/icons/${Weather3h_stateStr}.svg" width=50 height=50>
            <span class="tooltiptext">${Weather3h_stateStr}</span>
          </div>
          ${Hour3H}</td>
          <td style="text-align:center"> ${Temp3h_stateStr} F</td>
          <td style="text-align:center"> ${Precip3hprob_stateStr} % </td>
          <td style="text-align:center">${Precip3h_stateStr} in/hr</td>
      </tr>
</table>
`;
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
