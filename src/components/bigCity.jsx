import { useEffect , useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

const BigCity = () => {

  const [lonDes , setLonDes] = useState(); 
  const [lonTamp , setLonTamp] = useState(); 
  const [lonWind , setLonWind] = useState(); 
  const [] = useState(); 

  useEffect(() => {
    request();
  }, []);

  const request = async () => {
    const London = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=ce916057fd825bd31ff8b2656372f0ba`
    );
    setLonDes(London.data.weather[0].description);
    setLonTamp(London.data.main.temp);
    setLonWind(London.data.wind.speed);
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
          <h4>tamp : {lonTamp} </h4>
          <h4>Wind Speed : {lonWind} </h4>
        </div>
        <div className="bigcity-item paris">
          <h1>Paris</h1>
          <h4>What's the weather like? </h4>
          <h4>tamp</h4>
          <h4>Wind Speed</h4>
        </div>
        <div className="bigcity-item new-york">
          <h1>New York</h1>
          <h4>What's the weather like? </h4>
          <h4>tamp</h4>
          <h4>Wind Speed</h4>
        </div>
      </div>
    </>
  );
};

export default BigCity;
