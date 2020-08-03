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
    
    
    const UpdTime_0h = ${Precip0h}._getAttributeValueForKey(observation_time);

    this.content.innerHTML = `
      Preciptation in the next hour is ${Precip0h_stateStr}
      <br>
      and this is ${Precip0h}
      <br>
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
