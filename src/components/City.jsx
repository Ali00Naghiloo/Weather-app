import { useEffect, useState } from "react";
import "./.css";
import { StepForwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import axios from "axios";

function City() {
  const [cityName, setcityName] = useState();
  // const [Lat, setLat] = useState();
  // const [Lon, setLon] = useState();
  const [windSpeed, setWind] = useState();
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState();

  useEffect(() => {
    getReq();
  }, [cityName]);

  const getReq1 = async (Lat , Lon) => {
    try {
      const req1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setWind(req1.data.wind.speed);
      setDescription(req1.data.weather[0].description);
      setTemp(req1.data.main.temp);
      console.log(req1);
    } catch (error) {}
  };

  const getReq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      
      getReq1(req.data[0].lat , req.data[0].lon);
    } catch (error) {}
  };

  function searchValue(e) {
    setcityName(e.target.value);
    // e.preventdefault();
  }

  return (
    <div className="body">
        <input className="search" type="text" onChange={searchValue}/>
        {/* <input className="submit" type="submit" value="Search" /> */}
      {/* <StepForwardOutlined /> */}
      <label htmlFor="primary">Weather Description : </label>
      <Button type="primary">{description} <img src="../detail/wind-solid.svg" alt="" /></Button>
      <br />
      {/* <StepForwardOutlined /> */}
      <label htmlFor="danger">temperature : </label>
      <Button type="danger">{temp + " °"}</Button>
      <br />
      <label htmlFor="danger">wind Speed : </label>
      <Button type="primary">{windSpeed + " Km"}</Button>
    </div>
  );
}

export default City;
