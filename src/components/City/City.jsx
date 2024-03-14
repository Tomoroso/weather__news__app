import React from 'react';

const City = (props) => {

    const cityIconSize = 50;

    return (
        <div className="app__city">
            <img className="icon__small-screen" src={props.icon} alt="icon" id="icon" style={{ width: cityIconSize, height: cityIconSize }}/>
            <p style={{fontSize: '11px'}}>{props.aditionalInfo}</p>
            <h1>{props.city} {props.country}</h1>
            <h2>{props.temperature}<span>&deg;C</span></h2>
            <p>Feels like: {props.feels_like}<span>&deg;C</span></p>
            <p className="app__city-tohide">Humidity: {props.humidity}<span>%</span></p>
            <p>Chance of rain: {props.rain}<span>%</span></p>
            <p className="app__city-tohide">Max temperature: {props.max_temperature}<span>&deg;C</span></p>
            <p className="app__city-tohide">Min temperature: {props.min_temperature}<span>&deg;C</span></p>
            <p>Wind speed: {props.wind} Km/h</p>
        </div>
    )
}

export default City;
