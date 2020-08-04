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
    
    import "./hour0.js"
    import "./hour1.js"
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
