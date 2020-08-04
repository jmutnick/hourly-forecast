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
  
    //  this is start of repeat
    
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
  
    //weather condition
    const Weather0h = this.config.entity + '_weather_condition_0h';
    const Weather0h_state = hass.states[Weather0h];
    var Weather0h_stateStr = Weather0h_state ? Weather0h_state.state : 'unavailable';
    if (Weather0h_stateStr == "clear" && sunstatestr == "above_horizon") {
       Weather0h_stateStr = "clear_day";
    }
    else if (Weather0h_stateStr == "clear" && sunstatestr == "below_horizon") {
      Weather0h_stateStr = "clear_night";
    }
    
    //time of forecast
    const My0hDateTimeStr = hass.states[Precip0h].attributes.observation_time;
    const uiDateOptions = {  
      hour: 'numeric',
    };  //pluck out hour with options
    const event = new Date(My0hDateTimeStr);  //convert to date, didn't need to use the ${} 
    const Hour0H = event.toLocaleTimeString('en-US', uiDateOptions);  //do it

    // this is end of repeat
    
    
    //construct html
    this.content.innerHTML = `
      <table border=1>
      <tr><th>Condition/Time</th><th>Temp</th><th>Rain Probability</th><th>Precipitation</th></tr>
      <tr><td style="text-align:center"><IMG SRC="/local/community/hourly-forecast/icons/${Weather0h_stateStr}.svg"><br>${Hour0H}</td>
          <td style="text-align:center"> ${Temp0h_stateStr} F</td>
          <td style="text-align:center"> ${Precip0hprob_stateStr} % </td>
          <td style="text-align:center">${Precip0h_stateStr} in/hr</td>
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
