import { useEffect, useState } from "react";
import "./1.css";
import { StepForwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import axios from "axios";

function Hello() {
  const [cityName, setcityName] = useState();
  const [Lat, setLat] = useState();
  const [Lon, setLon] = useState();

  useEffect(() => {
    getReq();
  }, [cityName]);

  const getReq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      // console.log(req);
      // setCoordLat(req.data.Lat);
      setLat(req.data[0].lat);
      setLon(req.data[0].lon);
    } catch (error) {}
  };

  function searchValue(e) {
    setcityName(e.target.value);
  }

  return (
    <div className="body">
      <form>
        <input className="search" type="text" onChange={searchValue} />
        <input className="submit" type="submit" value="Search" />
        
      </form>
      <StepForwardOutlined />
      <label htmlFor="primary">Crood.lon for London : </label>
      <Button type="primary">{Lat}</Button>
      <br />
      <StepForwardOutlined />
      <label htmlFor="danger">Crood.lat for London : </label>
      <Button type="danger">{Lon}</Button>
    </div>
  );
}

export default Hello;
