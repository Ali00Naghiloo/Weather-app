import { useEffect, useState } from "react";
import "./style.css";
import "./darkStyle.css";
import moment from "jalali-moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import windLogo from "../Assets/wind-solid.svg";
import location from "../Assets/map-pin.svg";
import clock from "../Assets/icons8-clock.svg";
import search from "../Assets/icons8-search.svg";
import desico from "../Assets/icons8-description-64.png";
import humidityico from "../Assets/icons8-humidity-53.png";
import sunriseico from "../Assets/icons8-sunrise-50.png";
import sunsetico from "../Assets/icons8-sunset-50.png";
import cloudico from "../Assets/icons8-wind-64.png";
import UVindexico from "../Assets/icons8-uv-index-64.png";
import pressureico from "../Assets/icons8-pressure-64.png";
import lightModeIco from "../Assets/icons8-sun-64.png";
import darkModeIco from "../Assets/icons8-moon-64.png";
import { setForcast } from "../features/forcastReduser";
import { setBackMode } from "../features/backModeRduser";
import { setHourly } from "../features/hourlyReduser";

function YourCityLight() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      forcast.UVindex("Geolocation is not supported by this browser.");
    }
  }, []);

  // ------------------States------------------------------

  const forcast = useSelector((state) => state.forcasts.forcast);
  const backMode = useSelector((state) => state.backMode.backMode);
  const hourly = useSelector((state) => state.hourlyWeather.hourly);
  const dispatch = useDispatch();

  const [tempUnit, setTempUnit] = useState(" °c");
  const [coords, setCoords] = useState({ lat: "", lon: "" });

  const m = moment().locale("en").format("dddd , HH:mm");
  const notify = () => {
    toast.warn("Please fill the input!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // ----------------Requests---------------------

  const getReq1 = async (lat, lon, unit) => {
    try {
      const req1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      const sunriseValu = moment.unix(req1.data.sys.sunrise).format("HH:mm:ss");
      const sunsetValue = moment.unix(req1.data.sys.sunset).format("HH:mm:ss");
      dispatch(
        setForcast({
          weatherIco: req1.data.weather[0].icon,
          description: req1.data.weather[0].description,
          temp: req1.data.main.temp,
          feelLike: req1.data.main.feels_like,
          humidity: req1.data.main.humidity,
          pressure: req1.data.main.pressure,
          windSpeed: req1.data.wind.speed,
          cityReq1: req1.data.name,
          countryReq1: req1.data.sys.country,
          cloud: req1.data.clouds.all,
          sunrise: sunriseValu,
          sunset: sunsetValue,
        })
      );
      const req2 = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&cnt=5&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      dispatch(setHourly(req2.data.list));
      // const req3 = await axios.get(
      //   `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=2&appid=ce916057fd825bd31ff8b2656372f0ba`
      // );
      // console.log(req3);
    } catch (error) {
      toast.warn(error);
    }
  };

  const getReq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${forcast.cityName}&limit=1&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      getReq1(req.data[0].lat, req.data[0].lon, "metric");
      setCoords({
        lat: req.data[0].lat,
        lon: req.data[0].lon,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const SendValue = () => {
    if (forcast.cityName.length === 0) {
      notify();
    } else {
      getReq();
    }
  };

  const setPosition = (position) => {
    getReq1(position.coords.latitude, position.coords.longitude, "metric");
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  };

  return (
    <>
      <div className="continer-continerinput dark-box">
        <div className="continer-input">
          <form onSubmit={(e) => e.preventDefault()} className="form">
            <input
              placeholder="Search For Places..."
              className="search-input"
              onChange={(e) =>
                dispatch(setForcast({ ...forcast, cityName: e.target.value }))
              }
            />
            <button onClick={SendValue} className="submit">
              <img
                style={{ width: "25px", height: "30px", opacity: "0.6" }}
                src={search}
              />
            </button>
          </form>

          <div className="weather-ico">
            <img
              src={`http://openweathermap.org/img/wn/${forcast.weatherIco}@4x.png`}
              style={{ width: "100%", height: "100%" }}
              alt="weather icon"
            />
          </div>

          <h1 style={{ color: "#fff" }} className="temp">
            {forcast.temp + tempUnit}
          </h1>
          <span className="feels-like">
            {"Feels like: " + forcast.feelLike}
          </span>
          <span>
            <img style={{ width: "25px" }} src={desico} />
            {forcast.description}
          </span>
          <div className="break"></div>
          <span>{" " + m}</span>
          <span className="city-name">
            <img style={{ width: "20px" }} src={location} />
            {forcast.cityReq1 + "," + forcast.countryReq1}
          </span>
        </div>
      </div>

      <div className="highlights">
        <h1>Today's Highlights</h1>
        <span className="dark-box">
          humidity
          <img style={{ width: "60px" }} src={humidityico} alt="" />
          {forcast.humidity + "%"}
        </span>
        <span className="dark-box">
          wind speed
          <img style={{ width: "60px" }} src={windLogo} alt="" />
          {forcast.windSpeed + "km/h"}
        </span>
        <span className="dark-box">
          <div className="time-setrise">
            <img style={{ width: "40px" }} src={sunriseico} alt="" />
            <span>
              {forcast.sunrise}
              <h5>sunrise</h5>
            </span>
          </div>
          <div className="time-setrise">
            <img style={{ width: "40px" }} src={sunsetico} alt="" />
            <span>
              {forcast.sunset}
              <h5>sunset</h5>
            </span>
          </div>
        </span>
        <span className="dark-box">
          clouds
          <img style={{ width: "60px" }} src={cloudico} alt="" />
          {forcast.cloud + "%"}
        </span>
        <span className="dark-box">
          UV index
          <img style={{ width: "60px" }} src={UVindexico} alt="" />
          {forcast.UVindex}
        </span>
        <span className="dark-box">
          pressure
          <img style={{ width: "60px" }} src={pressureico} alt="" />
          {forcast.pressure + " hPa"}
        </span>
      </div>

      <div className="hourly-weather">
        {hourly.map((hour, index) => {
          return (
            <span className="dark-box" key={index}>
              <h1>Today</h1>
              {hour.dt_txt}
              <img
                style={{ width: "80px" }}
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt=""
              />
              {hour.weather[0].description}
              <br />
              {hour.main.temp}
            </span>
          );
        })}
      </div>

      <button
        className={`unit fa ${tempUnit === " °f" ? "selected-unit" : ""}`}
        onClick={() => {
          getReq1(coords.lat, coords.lon, "imperial");
          // dispatch(setForcast(...forcast, tempUnit : " °f"));
          setTempUnit(" °f");
        }}
      >
        °F
      </button>

      <button
        className={`unit cl ${tempUnit === " °c" ? "selected-unit" : ""}`}
        onClick={() => {
          getReq1(coords.lat, coords.lon, "metric");
          // dispatch(setForcast(...forcast, tempUnit: " °c"));
          setTempUnit(" °c");
        }}
      >
        °C
      </button>

      <button
        className={`light-btn ${backMode === "light" ? "selected-unit" : ""}`}
        onClick={() => {
          dispatch(setBackMode("light"));
        }}
      >
        <img style={{ width: "100%" }} src={lightModeIco} alt="" />
      </button>

      <button
        className={`dark-btn ${backMode === "dark" ? "selected-unit" : ""}`}
        onClick={() => {
          dispatch(setBackMode("dark"));
        }}
      >
        <img style={{ width: "100%" }} src={darkModeIco} alt="" />
      </button>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={5}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default YourCityLight;
