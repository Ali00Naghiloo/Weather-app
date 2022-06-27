import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

const BigCity = () => {
  const [lonDes, setLonDes] = useState();
  const [lonTamp, setLonTamp] = useState();
  const [lonWind, setLonWind] = useState();
  const [parDes, setParDes] = useState();
  const [parTamp, setParTamp] = useState();
  const [parWind, setParWind] = useState();
  const [nyDes, setNYDes] = useState();
  const [nyTamp, setNYTamp] = useState();
  const [nyWind, setNYWind] = useState();

  useEffect(() => {
    request();
    request1();
    request2();
  }, []);

  const request = async () => {
    try {
      const London = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setLonDes(London.data.weather[0].description);
      setLonTamp(London.data.main.temp);
      setLonWind(London.data.wind.speed);
    } catch (error) {
      alert(error)
    }
  };

  const request1 = async () => {
    try {
      const Paris = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=48.8589&lon=2.328&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setParDes(Paris.data.weather[0].description);
      setParTamp(Paris.data.main.temp);
      setParWind(Paris.data.wind.speed);
    } catch (error) {}
  };

  const request2 = async () => {
    try {
      const NY = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=40.7144&lon=-74.006&appid=ce916057fd825bd31ff8b2656372f0ba`
      );
      setNYDes(NY.data.weather[0].description);
      setNYTamp(NY.data.main.temp);
      setNYWind(NY.data.wind.speed);
    } catch (error) {}
  };

  return (
    <>
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
      <div className="continer-bigcity">
        <div className="bigcity-item london">
          <h1>London</h1>
          <h4>What's the weather like? {lonDes} </h4>
          <h4>tamp : {lonTamp + " °"} </h4>
          <h4>Wind Speed : {lonWind + " Km/h"} </h4>
        </div>
        <div className="bigcity-item paris">
          <h1>Paris</h1>
          <h4>What's the weather like? {parDes} </h4>
          <h4>tamp : {parTamp + " °"} </h4>
          <h4>Wind Speed : {parWind + " Km/h"} </h4>
        </div>
        <div className="bigcity-item new-york">
          <h1>New York</h1>
          <h4>What's the weather like? {nyDes} </h4>
          <h4>tamp : {nyTamp + " °"} </h4>
          <h4>Wind Speed : {nyWind + " Km/h"} </h4>
        </div>
      </div>
    </>
  );
};

export default BigCity;
