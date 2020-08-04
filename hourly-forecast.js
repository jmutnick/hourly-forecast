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

    const Precip0h = this.config.entity + '_precipitation_0h';
    const Precip0h_state = hass.states[Precip0h];
    const Precip0h_stateStr = Precip0h_state ? Precip0h_state.state : 'unavailable';
    
    const My0hDateTimeStr = hass.states[Precip0h].attributes.observation_time;
    
    const uiDateOptions = {  
      hour: 'numeric',
    };  //pluck out hour with options
    
    const event = new Date(My0hDateTimeStr);  //convert to date
    const Hour0H = event.toLocaleTimeString('en-US', uiDateOptions);  //do it
    
    this.content.innerHTML = `
      <table border=1>
      <tr><th>Time</th><th>Precipitation</th></tr>
      <tr><td> ${My0hDateTimeStr} </td><td>${Hour0H}</td></tr>
      </table>
`;
  }

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
