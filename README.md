<h1 align="center">⛅ 𝗪𝗲𝗮𝘁𝗵𝗲𝗿 𝗔𝗽𝗽</h1>
<p align="center">
❗ Demo Online <a href="https://ornate-kringle-5952d0.netlify.app/" target="_blank">Click Here</a>
</p>
<div>
  <p>🔎 <strong>About: </strong>See the weather in your city/state or anywhere in the world.</p>
</div>

<div>
  <h2>⚔️ Info</h2>
  <p>Users should be able to see or perform:</p>

  - [x] City weather by default, preferably current location
  - [x] Search by any city
  - [x] Weather of today and the next 8 days
  - [x] The date and location of the weather
  - [x] According to image for each type of weather
  - [x] The min and max degree each day
  - [x] Wind status and wind direction
  - [x] Humidity percentage
  - [x] Visibility indicator
  - [x] Request current location weather
  - [x] Convert temperature in Celsius to Fahrenheit
  - [x] Dark Mode
  - [x] Icons and special CSS style for each card
  - [x] 
</div>

<div>
  <h2>⚙️ 𝗣𝗹𝘂𝘀</h2>
  <p>✔️ If the user rejects the current location request permission, the location will be fetched through the ip address.</p>
  <p>✔️ Search autocomplete.</p>
</div>

## API
Weather data is retrieved from http://openweathermap.org/
OpenWeather platform is a set of elegant and widely recognisable APIs. Powered by convolutional machine learning solutions, it is capable of delivering all the weather information necessary for decision-making for any location on the globe. To start using our APIs, please sign up here.

##Instructions
to start this project git clone [this-git-repo] install all dependiencies by npm i to start this project npm start if you want to run it for production npm run build change API keys with your own this for test only not built for production cases

### API Usage
This build is for local mode not for production mode to change for producton use process.env.[VARIABL_NAME]

```const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const ApiKey = "89ee527580941754fd82b66af125b56e"
```
### Fetch Reuest
Below is fetch request from WeatherContext you can add mre ueState to adjust what api to display
I have setup data coord and API url must given from  

``` try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${ApiKey}`
          );
          const weatherInfo = await res.json();
          setcWeather(weatherInfo.current);
          setForecast(weatherInfo.daily);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        } ```
### React Context
Remember to add stetes and functions to consume it later in the component
```  const data = {
    loading,
    error,
    handleTheme,
    theme,
    cWeather,
    forecast,
    location,
    temp,
    fetchWeather,
    weatherGps,
    setCel,
    cel,
  };```

### consume cotext
You can consume context like example blow
```  const { cWeather, location, cel } = useContext(WeatherContext);
// Fallback
  if (cWeather === null) {
    return <CardWire />;
  }
  
        <div
          id={cWeather.weather[0].id}
          desc={cWeather.weather[0].description}
        />```

### change dark mode and cel to fahrenheit
```
      <button
        className={`moon-icon settingBtn relative top-1.5 ${theme}`}
        onClick={handleTheme}
      >
      <button className={`settingBtn ${theme}`} onClick={() => setCel(true)} />```


### get current weather
```
const { cWeather, location, cel } = useContext(WeatherContext);
  const time = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return (
  // get Week day and day in the month
   <p>
          {days[time.getDay()]}, {time.getDate()} {month[time.getMonth()]}
   </p>
   // Get temperature
             <h1>
            {cel
              ? Math.floor(cWeather.temp)
              : (Math.floor(cWeather.temp) * 9) / 5 + 32}
          </h1>
          )
```
  
### Search Bar
Search bar is a button when you click it set state to true and re-render searchBar component
it handle type form and and update the state
```
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather(city);
    setSearchActive(false);
  };
  ```

### Highlight section
High section have 6 cards each card have special functions and it's own states
```
<!--  only change when humidity changes and humidity change when the location change   -->

  useEffect(() => {
    setHumidityCurrent(cWeather?.humidity);
  }, [cWeather?.humidity, setHumidityCurrent]);
  
<!-- get the sunrise from api then convert it to 24 hour -->
  const sunriseCalc = new Date(cWeather?.sunrise * 1000);
  const sunriseHour = sunriseCalc.getHours();
  const sunriseMin = sunriseCalc.getMinutes();
  const sunriseInfo = sunriseHour + ":" + sunriseMin;

<!--  get the sunset from api then convert it to 24 hour -->
  const sunsetCalc = new Date(cWeather?.sunset * 1000);
  const sunsetHour = sunsetCalc.getHours();
  const sunsetMin = sunsetCalc.getMinutes();
  const sunsetInfo = sunsetHour + ":" + sunsetMin;
  
<!--  handle change cel to fahrenheit  -->
                <small className="font-bold">
                  {cel
                    ? Math.floor(item.temp.max)
                    : (Math.floor(item.temp.max) * 9) / 5 + 32}
                  <span>º{cel ? "C" : "F"}</span>
                </small>
```

## Preview


<h3 align="center">Desktop</h3>
<iframe src="https://drive.google.com/file/d/1bvINiKU-7xG5o7TwXX56ETb0kl3DDEg0/view" width="640" height="480"></iframe>


<h3 align="center">Mobile View</h3>
<iframe src="https://drive.google.com/file/d/1LEtCXEeZvYL5u01izpIDZsYFWjObq4fn/view" width="640" height="480"></iframe>
