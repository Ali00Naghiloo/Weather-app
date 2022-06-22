import { useEffect, useState } from "react";
import "./.css";
import { StepForwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import axios from "axios";
import windLogo from "../Assets/wind-solid.svg";

function City() {



  // ------------------States------------------------------

  const [cityName, setCityName] = useState();
  const [windSpeed, setWind] = useState(null);
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState();
  const [country, setCountry] = useState();
  const [cityReq1, setCityReq1] = useState();


  useEffect(() => {
    getReq();
  }, [cityName]);


  // ----------------Requests---------------------

  const getReq1 = async (Lat, Lon) => {
    try {
      const req1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setWind(req1.data.wind.speed);
      setDescription(req1.data.weather[0].description);
      setTemp(req1.data.main.temp);
      setCityReq1(req1.data.name )
      console.log(req1);
    } catch (error) {}
  };

  const getReq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=ce916057fd825bd31ff8b2656372f0ba`
      );

      getReq1(req.data[0].lat, req.data[0].lon);
    } catch (error) {}
  };



  // function SV1(e) {
  //   setCityName(e);
  //   e.preventdefault();
  // }

  function SV(e) {
    setCityName(e.target.value); 
    SV1(cityValue);
    console.log(cityValue);
  }

  return (
    <div className="body">
      <input placeholder="Search Your City ..." className="search-input" onChange={SV} />
      {/* <input className="submit" type="submit" value="Search" onClick={SV1} /><br /> */}
      <h1>{cityReq1}</h1>
      <span>Weather Description : {description}</span><br />
      <span>temperature : {temp + " °"}</span><br />
      <span>
        wind Speed : {windSpeed + " Km/h"}{" "}
        <img className="wind-logo" src={windLogo} alt="" />
      </span>
    </div>
  );
}

export default City;
