import React, {useState, useEffect} from 'react';
import debounce from 'lodash.debounce';
import City from '../City/City';
import Footer from '../Footer/Footer';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

import './weatherScreen.css'
const WeatherScreen = () => {

  const key = '1d57fcba75368cc323dc71241f670c5d';
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Use latitude and longitude to fetch weather data
                setUserLocation({
                    latitude: latitude,
                    longitude: longitude
                })
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    getGeoLocation();
  }, [])



  
    const [showWeather, setShowWeather] = useState(false);
    const [weather, setWeather] = useState({
        temperature: 0,
        humidity: 0,
        feels_like: 0,
        wind_speed: 0,
        rain: 0,
        max_temperature: 0,
        min_temperature: 0,
        icon: ''
    });
    const [geoLocation, setGeoLocation] = useState([]);
    const [clickedCityData, setClickedCityData] = useState({
        lat: 0,
        lon: 0,
        city: '',
        country: ''
    });

    const [citiesWeather, setCitiesWeather] = useState([
        {
          city: 'London',
          country: 'GB',
          icon: '',
          temperature: 0,
          humidity: 0,
          feels_like: 0,
          wind_speed: 0,
          rain: 0,
          max_temperature: 0,
          min_temperature: 0
        },
        {
          city: 'Amsterdam',
          country: 'NL',
          icon: '',
          temperature: 0,
          humidity: 0,
          feels_like: 0,
          wind_speed: 0,
          rain: 0,
          max_temperature: 0,
          min_temperature: 0
        },
        {
          city: 'Tokyo',
          country: 'JP',
          icon: '',
          temperature: 0,
          humidity: 0,
          feels_like: 0,
          wind_speed: 0,
          rain: 0,
          max_temperature: 0,
          min_temperature: 0
        },

        {
        city: 'Your location',
        country: 'Your country',
        icon: '',
        temperature: 0,
        humidity: 0,
        feels_like: 0,
        wind_speed: 0,
        rain: 0,
        max_temperature: 0,
        min_temperature: 0
        }
      ]);
      

    useEffect(() => {
        const showCityWeather = async () => {
            const openWeatherLondonURL = `https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=${key}&units=metric`; 
            const openWeatherAmsterdamURL = `https://api.openweathermap.org/data/2.5/weather?lat=52.3676&lon=4.9041&appid=${key}&units=metric`; 
            const openWeatherTokyoURL = `https://api.openweathermap.org/data/2.5/weather?lat=35.6764&lon=139.6500&appid=${key}&units=metric`; 
            const userLocationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${key}&units=metric`;
                                      

            const resultUserLocation = await fetch(userLocationURL);
            const dataUserLocation = await resultUserLocation.json();
    

            const resultLondon2 = await fetch(openWeatherLondonURL);
            const dataLondon2 = await resultLondon2.json();

            const resultAmsterdam2 = await fetch(openWeatherAmsterdamURL);
            const dataAmsterdam2 = await resultAmsterdam2.json();

            const resultTokyo2 = await fetch(openWeatherTokyoURL);
            const dataTokyo2 = await resultTokyo2.json();

            const iconUserLocation = dataUserLocation.weather[0].icon;
            const max_temperatureUserLocation = Math.round(dataUserLocation.main.temp_max);
            const min_temperatureUserLocation = Math.round(dataUserLocation.main.temp_min);
            const countryUserLocation = dataUserLocation.sys.country;
            const aproximateCityLocation = dataUserLocation.name;

            const iconLondon = dataLondon2.weather[0].icon;
            const max_temperatureLondon = Math.round(dataLondon2.main.temp_max);
            const min_temperatureLondon = Math.floor(dataLondon2.main.temp_min);

            const iconAmsterdam = dataAmsterdam2.weather[0].icon;
            const max_temperatureAmsterdam = Math.round(dataAmsterdam2.main.temp_max);
            const min_temperatureAmsterdam = Math.floor(dataAmsterdam2.main.temp_min);

            const iconTokyo = dataTokyo2.weather[0].icon;
            const max_temperatureTokyo = Math.round(dataTokyo2.main.temp_max);
            const min_temperatureTokyo = Math.floor(dataTokyo2.main.temp_min);
            
            const londonURL = `https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&daily=weather_code&timezone=Europe%2FLondon`;
            const amsterdamURL = `https://api.open-meteo.com/v1/forecast?latitude=52.3676&longitude=4.9041&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&daily=weather_code&timezone=Europe%2FLondon`;
            const tokyoURL = `https://api.open-meteo.com/v1/forecast?latitude=35.6764&longitude=139.6500&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&daily=weather_code&timezone=Europe%2FLondon`;
            const userLocationURL2 = `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&daily=weather_code&timezone=Europe%2FLondon`
            
            const resultUserLocation2 = await fetch(userLocationURL2);
            const dataUserLocation2 = await resultUserLocation2.json();
            
            
            const temperatureUserLocation = dataUserLocation2.current.temperature_2m;
            const humidityUserLocation = dataUserLocation2.current.relative_humidity_2m;
            const feels_likeUserLocation = dataUserLocation2.current.apparent_temperature;
            const wind_speedUserLocation = dataUserLocation2.current.wind_speed_10m;
            const rainUserLocation = dataUserLocation2.current.rain;

            const resultLondon = await fetch(londonURL);
            const dataLondon = await resultLondon.json();

            const temperatureLondon = dataLondon.current.temperature_2m;
            const humidityLondon = dataLondon.current.relative_humidity_2m;
            const feels_likeLondon = dataLondon.current.apparent_temperature;
            const wind_speedLondon = dataLondon.current.wind_speed_10m;
            const rainLondon = dataLondon.current.rain;
            
            const resultAmsterdam = await fetch(amsterdamURL);
            const dataAmsterdam = await resultAmsterdam.json();
            
            const temperatureAmsterdam = dataAmsterdam.current.temperature_2m;
            const humidityAmsterdam = dataAmsterdam.current.relative_humidity_2m;
            const feels_likeAmsterdam = dataAmsterdam.current.apparent_temperature;
            const wind_speedAmsterdam = dataAmsterdam.current.wind_speed_10m;
            const rainAmsterdam = dataAmsterdam.current.rain;
            
            const resultTokyo = await fetch(tokyoURL);
            const dataTokyo = await resultTokyo.json();
            
            const temperatureTokyo = dataTokyo.current.temperature_2m;
            const humidityTokyo = dataTokyo.current.relative_humidity_2m;
            const feels_likeTokyo = dataTokyo.current.apparent_temperature;
            const wind_speedTokyo = dataTokyo.current.wind_speed_10m;
            const rainTokyo = dataTokyo.current.rain;

            const updateCityWeather = (cityIndex, weatherData) => {
            setCitiesWeather(prevWeather => {
            const updatedCitiesWeather = [...prevWeather];
            updatedCitiesWeather[cityIndex] = { ...updatedCitiesWeather[cityIndex], ...weatherData };
            return updatedCitiesWeather;
            });

            console.log('this is user location' , userLocation);
          };

          updateCityWeather(0, { temperature: temperatureLondon, humidity: humidityLondon, icon: `http://openweathermap.org/img/wn/${iconLondon}@4x.png`, wind_speed: wind_speedLondon, feels_like: feels_likeLondon, rain: rainLondon, max_temperature: max_temperatureLondon, min_temperature: min_temperatureLondon });
          updateCityWeather(1, { temperature: temperatureAmsterdam, humidity: humidityAmsterdam, icon: `http://openweathermap.org/img/wn/${iconAmsterdam}@4x.png`, wind_speed: wind_speedAmsterdam, feels_like: feels_likeAmsterdam, rain: rainAmsterdam, max_temperature: max_temperatureAmsterdam, min_temperature: min_temperatureAmsterdam });
          updateCityWeather(2, { temperature: temperatureTokyo, humidity: humidityTokyo, icon: `http://openweathermap.org/img/wn/${iconTokyo}@4x.png`, wind_speed: wind_speedTokyo, feels_like: feels_likeTokyo, rain: rainTokyo, max_temperature: max_temperatureTokyo, min_temperature: min_temperatureTokyo });
          updateCityWeather(3, { temperature: temperatureUserLocation, humidity: humidityUserLocation, icon: `http://openweathermap.org/img/wn/${iconUserLocation}@4x.png`, wind_speed: wind_speedUserLocation, feels_like: feels_likeUserLocation, rain: rainUserLocation, max_temperature: max_temperatureUserLocation, min_temperature: min_temperatureUserLocation, city: aproximateCityLocation, country: countryUserLocation })
        };
        showCityWeather();

    }, [key, userLocation])



    //Getting the user input:
    const [userInput, setUserInput] = useState("");
    
    const updateUserInput = (e) => {
        setUserInput(e?.target?.value); 
    }

    //Setting the waiting time for user input:
    const debouncedOnChange = debounce(updateUserInput, 600);

    useEffect(() => {
        const searchTemp = async () => {
        const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${clickedCityData.lat}&lon=${clickedCityData.lon}&appid=${key}&units=metric`;    
        const openMeteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${clickedCityData.lat}&longitude=${clickedCityData.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,visibility,wind_speed_10m,wind_speed_80m,wind_speed_120m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&daily=weather_code&timezone=Europe%2FLondon`;

        
            const results1 = await fetch(openMeteoURL);
            const data1 = await results1.json();
            console.log('Data from open-meteo: ', data1); 

            const temperature = Math.round(data1.current.temperature_2m);
            const humidity = Math.round(data1.current.relative_humidity_2m);
            const feels_like = Math.round(data1.current.apparent_temperature);
            const wind_speed = data1.current.wind_speed_10m;
            const rain = data1.current.rain;
            
            const results2 = await fetch(openWeatherURL);
            const data2 = await results2.json();
            console.log('Data from openWeather: ', data2)
            
            const max_temperature = Math.round(data2.main.temp_max);
            const min_temperature = Math.floor(data2.main.temp_min);
            const icon = data2.weather[0].icon;

  
           

        setWeather({
            temperature: temperature,
            humidity: humidity,
            feels_like: feels_like,
            wind_speed: wind_speed,
            rain: rain,
            max_temperature: max_temperature,
            min_temperature: min_temperature,
            icon: `http://openweathermap.org/img/wn/${icon}@4x.png`
        });
    };
    searchTemp();
    
}, [clickedCityData]);

//Here I take the geoLocation data.

    useEffect(() => {
        const search = async () => {
            const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${userInput}&count=5&language=en&format=json`
            const results = await fetch(URL);
            const data = await results.json();
            

            setGeoLocation(data.results);                                         
        }
        search();
    }, [userInput]);

//Here i get the clicked city geolocation info

   const handleClick = (e) => {
       const li = e.target;
       const data = li.dataset;  // Access the dataset of the clicked element
       console.log('dataset: ',li.dataset)

       setClickedCityData({lat: data.lat, lon: data.lon, city: data.city, country: data.country});
       setShowWeather(true);
       window.scrollTo({ top: 0, behavior: 'smooth' });

   }

   function handleSpanClick(event) {
    event.stopPropagation();
    const li = event.target.parentNode;
    const data = li.dataset;
    setClickedCityData({lat: data.lat, lon: data.lon, city: data.city, country: data.country});
    setShowWeather(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

    const buttonClick = () => {
        setShowWeather(false);
    }

    
return (

        <div className="app__container">

            {showWeather ? (
                <div className="background">
                
                
                    <div className="app__show-weather ">

                            <div id="weather" className="">
                                <img src={weather.icon} alt="icon" id="icon" />
                                <h1 className="app__degree">{weather.temperature}&deg;C</h1>
                            
                                <h2 id="city">{clickedCityData.city} {clickedCityData.country}</h2>
                                <button className="btn__change-city btn" onClick={buttonClick} id="change">Change City</button>

                                <div className="info">

                                    <div className="value">
                                        <h3>Wind</h3>
                                        <div id="windValue" ><p>{weather.wind_speed} Km/h</p></div>
                                    </div>
                                    <div className="value">
                                        <h3>Feels Like</h3>
                                        <div id="feelsLikeValue" ><p>{weather.feels_like}&deg;C</p></div>
                                    </div>
                                    <div className="value">
                                        <h3>Humidity</h3>
                                        <div id="humidityValue" ><p>{weather.humidity}%</p></div>
                                    </div>
                                    <div className="value">
                                        <h3>Chance of Rain</h3>
                                        <div id="rainValue" ><p>{weather.rain}%</p></div>
                                    </div>
                                    <div className="value">
                                        <h3>MaxTemperature</h3>
                                        <div id="max-temp-Value" ><p>{weather.max_temperature}&deg;C</p></div> 
                                    </div>
                                    <div className="value">
                                        <h3>MinTemperature</h3>
                                        <div id="min-temp-Value" ><p>{weather.min_temperature}&deg;C</p></div>
                                    </div>

                                </div>

                            </div>
                    </div>



                </div>
                



            ) : (
                <div className="app__cities-and-form" >

                    <h4 className="app__top-header">Weather App Built by V. Pinteac</h4>

                    <div className="app__big-cities form-and-cities-together">
                    <div className="app__city">
                        <City
                            city={citiesWeather[0].city}
                            country={citiesWeather[0].country}
                            icon={citiesWeather[0].icon}
                            temperature={citiesWeather[0].temperature}
                            feels_like={citiesWeather[0].feels_like}
                            humidity={citiesWeather[0].humidity}
                            rain={citiesWeather[0].rain}
                            max_temperature={citiesWeather[0].max_temperature}
                            min_temperature={citiesWeather[0].min_temperature}
                            wind={citiesWeather[0].wind_speed}
                        />
                    </div>
                    <div className="app__city">
                        <City
                            city={citiesWeather[1].city}
                            country={citiesWeather[1].country}
                            icon={citiesWeather[1].icon}
                            temperature={citiesWeather[1].temperature}
                            feels_like={citiesWeather[1].feels_like}
                            humidity={citiesWeather[1].humidity}
                            rain={citiesWeather[1].rain}
                            max_temperature={citiesWeather[1].max_temperature}
                            min_temperature={citiesWeather[1].min_temperature}
                            wind={citiesWeather[1].wind_speed}
                        />
                    </div>
                    <div className="app__city">
                        <City
                            city={citiesWeather[2].city}
                            country={citiesWeather[2].country}
                            icon={citiesWeather[2].icon}
                            temperature={citiesWeather[2].temperature}
                            feels_like={citiesWeather[2].feels_like}
                            humidity={citiesWeather[2].humidity}
                            rain={citiesWeather[2].rain}
                            max_temperature={citiesWeather[2].max_temperature}
                            min_temperature={citiesWeather[2].min_temperature}
                            wind={citiesWeather[2].wind_speed}
                        />
                    </div>

                    <div className="app__city user-location">
                        <City
                            aditionalInfo="Approx. loc."
                            city={citiesWeather[3].city}
                            country={citiesWeather[3].country}
                            icon={citiesWeather[3].icon}
                            temperature={citiesWeather[3].temperature}
                            feels_like={citiesWeather[3].feels_like}
                            humidity={citiesWeather[3].humidity}
                            rain={citiesWeather[3].rain}
                            max_temperature={citiesWeather[3].max_temperature}
                            min_temperature={citiesWeather[3].min_temperature}
                            wind={citiesWeather[3].wind_speed}
                        />
                    </div>


                    </div>

                    <div className="app__form form-cities-together">
                        <form>
                            <input className="input__field" onChange={debouncedOnChange} type="text" placeholder="Search City..." />

                            {geoLocation ? (
                                <ul onClick={handleClick}>
                                    {geoLocation.map(({name, latitude, longitude, country}, index) => (
                                        <li className="app__list-item"
                                        key={index}
                                        data-lat={latitude}
                                        data-lon={longitude}
                                        data-city={name}
                                        data-country={country}
                                        >
                                        {name} <span onClick={handleSpanClick}>{country}</span>
                                        
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Waiting...</p>
                            )
                            
                            }
                        </form>
                    </div>

                </div>

            )}

            <div className="twitter__container">
                <div className="twitter__heading"><h1>Netherland News</h1></div>

                <div className="twitter__element">
                <TwitterTimelineEmbed
                    sourceType="https://twitter.com/NL_Times?ref_src=twsrc%5Etfw"
                    screenName="NL_Times"
                    options={{ height: 500, width: 600 }}
                />
                </div>
                
                <div className="twitter__element">
                <TwitterTimelineEmbed
                    sourceType="https://twitter.com/KNMI?ref_src=twsrc%5Etfw"
                    screenName="KNMI"
                    options={{ height: 500, width: 600 }}
                />               
                </div>

                <div className="twitter__element">
                <TwitterTimelineEmbed
                    sourceType="https://twitter.com/DutchNewsNL?ref_src=twsrc%5Etfw"
                    screenName="DutchNewsNL"
                    options={{ height: 500, width: 600 }}
                />
                </div>

                <div className="twitter__element">
                <TwitterTimelineEmbed
                    sourceType="https://twitter.com/accuweather?ref_src=twsrc%5Etfw"
                    screenName="Accuweather"
                    options={{ height: 500, width: 600 }}
                />
                </div>

            

            </div>
            <div className="app__footer flex__center">
                <Footer />
            </div>
            

        </div>

       )
}


export default WeatherScreen;