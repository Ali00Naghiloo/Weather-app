import { useEffect, useState } from "react";
import "./1.css";
import { StepForwardOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import axios from "axios";

function Hello() {
  const [LondonLon, setLondonLon] = useState();
  const [LondonLat, setLondonLat] = useState();

  useEffect(() => {
    getReq();
  }, []);

  const getReq = async () => {
    try {
      const req = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?apiKey=ce916057fd825bd31ff8b2656372f0ba&lat=57&lon=-2.15&}`
      );
      setLondonLon(req.data.coord.lon);
      setLondonLat(req.data.coord.lat);
    } catch (error) {}
  };

  return (
    <div className="body">
      <StepForwardOutlined />
      <label htmlFor="primary">Crood.lon for London : </label>
      <Button type="primary">{LondonLon}</Button><br />
      <StepForwardOutlined />
      <label htmlFor="danger">Crood.lat for London : </label>
      <Button className="btn-Lot" type="danger">{LondonLat}</Button>
    </div>
  );
}

export default Hello;
