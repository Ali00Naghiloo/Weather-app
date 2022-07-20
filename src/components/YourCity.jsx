import { useEffect, useState } from "react";
import "./.css";
import moment from "jalali-moment";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import windLogo from "../Assets/wind-solid.svg";
import location from "../Assets/map-pin.svg";
import clock from "../Assets/icons8-clock.svg";
import search from "../Assets/icons8-search.svg";
import desico from "../Assets/icons8-description-64.png";

function YourCity() {
  // ------------------States------------------------------

  const [cityName, setCityName] = useState("");
  const [windSpeed, setWind] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState("");
  const [countryReq1, setCountryReq1] = useState("");
  const [cityReq1, setCityReq1] = useState("");
  const [changeUnits, setChangeUnits] = useState("metric");

  const m = moment().locale("en").format("YYYY/MM/DD , HH:mm");

  const notify = () => {
    toast.warn("Please fill the input!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  // useEffect(() => {
  //   getReq1()
  // }, [changeUnits]);

  
  // ----------------Requests---------------------

  const getReq1 = async (Lat, Lon) => {
    try {
      const req1 = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&units=${changeUnits}&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setDescription(req1.data.weather[0].description);
      setTemp(req1.data.main.temp);
      setWind(req1.data.wind.speed);
      setCityReq1(req1.data.name);
      setCountryReq1(req1.data.sys.country);
      console.log(req1);
    } catch (error) {
      alert("error1");
    }
  };


  const getreq = async () => {
    try {
      const req = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      getReq1(req.data[0].lat, req.data[0].lon);
    } catch (error) {
      alert(error);
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
              <img src={search} />
            </button>
          </form>

          <h1 className="city-name">
            <img style={{ width: "1em" }} src={cityName ? location : ""} />
            {cityName ? cityReq1 + "," + countryReq1 : " "}
          </h1>
          <span>
            <img src={cityName ? clock : ""} alt="" />
            {cityName ? " " + m : ""}
          </span>
          <span>
            <img
              style={{ width: "25px" }}
              src={cityName ? desico : ""}
              alt=""
            />
            {cityName ? description : ""}
          </span>
          <span>{cityName ? temp + " °" : ""}</span>
          <span>
            <img className="wind-logo" src={cityName ? windLogo : ""} alt="" />
            {cityName ? windSpeed + " Km/h" : ""}
          </span>
          <button onClick={()=> setChangeUnits("imperial")}>
            click
          </button>
        </div>
      </div>
      <div className="highlights">
        <span>hello</span>
        <span>hello</span>
        <span>hello</span>
        <span>hello</span>
        <span>hello</span>
        <span>hello</span>
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
