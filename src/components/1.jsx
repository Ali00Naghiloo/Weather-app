import { useEffect, useState } from "react";
import "./1.css";
import { StepForwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import axios from "axios";

function Hello() {
  const [cityName, setcityName] = useState();
  console.log(cityName);

  useEffect(() => {
    getReq();
  }, []);

  const getReq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      console.log(req);
    } catch (error) {}
  };

  function searchValue(e) {
    const value = e.target.value;
    setcityName(value);
  }

  return (
    <div className="body">
      <input className="search" type="text" onChange={searchValue} />
      {/* <StepForwardOutlined />
      <label htmlFor="primary">Crood.lon for London : </label>
      <Button type="primary">{LondonLon}</Button>
      <br />
      <StepForwardOutlined />
      <label htmlFor="danger">Crood.lat for London : </label>
      <Button type="danger">{LondonLat}</Button> */}
    </div>
  );
}

export default Hello;
