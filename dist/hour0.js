
    
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
    
    
