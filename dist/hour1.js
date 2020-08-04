
    
    //precip 
    const Precip1h = this.config.entity + '_precipitation_1h';
    const Precip1h_state = hass.states[Precip1h];
    const Precip1h_stateStr = Precip1h_state ? Precip1h_state.state : 'unavailable';
   
    //precip prob
    const Precip1hprob = this.config.entity + '_precipitation_probability_1h';
    const Precip1hprob_state = hass.states[Precip1hprob];
    const Precip1hprob_stateStr = Precip0hprob_state ? Precip1hprob_state.state : 'unavailable';
   
     //temperature
    const Temp1h = this.config.entity + '_temperature_1h';
    const Temp1h_state = hass.states[Temp1h];
    const Temp1h_stateStr = Temp1h_state ? Temp1h_state.state : 'unavailable';
  
    //weather condition
    const Weather1h = this.config.entity + '_weather_condition_1h';
    const Weather1h_state = hass.states[Weather1h];
    var Weather1h_stateStr = Weather1h_state ? Weather1h_state.state : 'unavailable';
    if (Weather1h_stateStr == "clear" && sunstatestr == "above_horizon") {
       Weather1h_stateStr = "clear_day";
    }
    else if (Weather1h_stateStr == "clear" && sunstatestr == "below_horizon") {
      Weather1h_stateStr = "clear_night";
    }
    
    //time of forecast
    const My1hDateTimeStr = hass.states[Precip1h].attributes.observation_time;
    const uiDateOptions = {  
      hour: 'numeric',
    };  //pluck out hour with options
    const event = new Date(My1hDateTimeStr);  //convert to date, didn't need to use the ${} 
    const Hour1H = event.toLocaleTimeString('en-US', uiDateOptions);  //do it

    // this is end of repeat
    
    
