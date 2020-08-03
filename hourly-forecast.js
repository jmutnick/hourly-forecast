class HourlyForecast extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'Example card';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    //const entityId = this.config.entity;
    //const state = hass.states[entityId];
    //const stateStr = state ? state.state : 'unavailable';

    const Precip0h = this.config.entity + '_precipitation_0h';
    const Precip0h_state = hass.states[Precip0h];
    const Precip0h_stateStr = Precip0h_state ? Precip0h_state.state : 'unavailable';

    const 0h_time = hass.states[Precip0h].attributes.observation_time;
    const 0h_time_stateStr = 0htime ? Precip0h_state.statei.attributes.observation_time : 'unavailable';

    this.content.innerHTML = `
      Preciptation in the next hour is ${Precip0h_stateStr}
      <br>
      and this is ${Precip0h}
      <br>
      and the time is ${0h_time_stateStr}
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define a weather entity');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('hourly-forecast', HourlyForecast);
