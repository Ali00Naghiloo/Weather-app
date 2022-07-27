import { useEffect, useState } from "react";
import "./style.css";
import { Carousel } from "antd";
import moment from "jalali-moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

function YourCity() {
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     setUVindex("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  // const showPosition = (position)=> {
  //   console.log(position.cooeds.latitude);
  // }

  // ------------------States------------------------------

  const [cityName, setCityName] = useState("");
  const [windSpeed, setWind] = useState("");
  const [description, setDescription] = useState("");
  const [weatherIco, setWeatherIco] = useState();
  const [temp, setTemp] = useState("");
  const [feelLike, setFeelLike] = useState("");
  const [countryReq1, setCountryReq1] = useState("");
  const [cityReq1, setCityReq1] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [cloud, setCloud] = useState("");
  const [UVindex, setUVindex] = useState("");
  const [pressure, setPressure] = useState("");
  const [hourly, setHourly] = useState([]);
  const [changeUnits, setChangeUnits] = useState("metric");
  const [isLoading, setIsLoading] = useState(true);

  const m = moment().locale("en").format("dddd , HH:mm");

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

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

  const getReq1 = async (Lat, Lon) => {
    try {
      const req1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&units=${changeUnits}&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setDescription(req1.data.weather[0].description);
      setWeatherIco(req1.data.weather[0].icon);
      setTemp(req1.data.main.temp);
      setFeelLike(req1.data.main.feels_like);
      setHumidity(req1.data.main.humidity);
      setPressure(req1.data.main.pressure);
      setWind(req1.data.wind.speed);
      setCityReq1(req1.data.name);
      setCountryReq1(req1.data.sys.country);
      setCloud(req1.data.clouds.all);
      const sunriseValu = moment.unix(req1.data.sys.sunrise).format("HH:mm:ss");
      setSunrise(sunriseValu);
      const sunsetValue = moment.unix(req1.data.sys.sunset).format("HH:mm:ss");
      setSunset(sunsetValue);
      console.log(req1);
      const req2 = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Lon}&units=${changeUnits}&cnt=4&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setHourly(req2.data.list);
      console.log(req2);
    } catch (error) {
      alert(error);
    }
  };

  const getreq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      getReq1(req.data[0].lat, req.data[0].lon);
    } catch (error) {
      alert("please fill input correctly!");
    }
  };

  const SendValue = () => {
    if (cityName.length === 0) {
      notify();
    } else {
      getreq();
    }
  };

  return (
    <>
      <div className="continer-continer">
        <div className="continer-input">
          <form onSubmit={(e) => e.preventDefault()} className="form">
            <input
              placeholder="Search For Places..."
              className="search-input"
              onChange={(e) => setCityName(e.target.value)}
            />
            <button onClick={SendValue} className="submit">
              <img
                style={{ width: "25px", height: "30px", opacity: "0.6" }}
                src={search}
              />
            </button>
          </form>

          {cityName ? (
            <div className="weather-ico">
              <img
                src={`http://openweathermap.org/img/wn/${weatherIco}@4x.png`}
                style={{ width: "100%", height: "100%" }}
                alt="weather icon"
              />
            </div>
          ) : (
            ""
          )}

          <h1 className="temp">{cityName ? temp + " °c" : ""}</h1>
          <span className="feels-like">
            {cityName ? "Feels like: " + feelLike : ""}
          </span>
          <span>
            <img style={{ width: "25px" }} src={cityName ? desico : ""} />
            {cityName ? description : ""}
          </span>
          {cityName ? <div className="break"></div> : ""}
          <span>{cityName ? " " + m : ""}</span>
          <span className="city-name">
            <img style={{ width: "20px" }} src={cityName ? location : ""} />
            {cityName ? cityReq1 + "," + countryReq1 : ""}
          </span>
        </div>
      </div>

      <div className="highlights">
        <h1>Today's Highlights</h1>
        <span>
          humidity
          <img style={{ width: "60px" }} src={humidityico} alt="" />
          {humidity + "%"}
        </span>
        <span>
          wind speed
          <img style={{ width: "60px" }} src={windLogo} alt="" />
          {windSpeed + "km/h"}
        </span>
        <span>
          <div className="time-setrise">
            <img style={{ width: "40px" }} src={sunriseico} alt="" />
            <span>
              {sunrise}
              <h5>sunrise</h5>
            </span>
          </div>
          <div className="time-setrise">
            <img style={{ width: "40px" }} src={sunsetico} alt="" />
            <span>
              {sunset}
              <h5>sunset</h5>
            </span>
          </div>
        </span>
        <span>
          clouds
          <img style={{ width: "60px" }} src={cloudico} alt="" />
          {cloud + "%"}
        </span>
        <span>
          UV index
          <img style={{ width: "60px" }} src={UVindexico} alt="" />
          {UVindex}
        </span>
        <span>
          pressure
          <img style={{ width: "60px" }} src={pressureico} alt="" />
          {pressure + " hPa"}
        </span>
      </div>

      <div className="hourly-weather">
        {hourly.map((hour, index) => {
          return (
            <span key={index}>
              <h1>Hourly Weather</h1>
              {hour.dt_txt}
              <img
                style={{ width: "60px" }}
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt=""
              />
              {hour.weather[0].description}
              <br />
              {hour.main.temp} °c
            </span>
          );
        })}
      </div>
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

export default YourCity;
