import YourCityLight from "./components/yourCityLight";
import YourCityDark from "./components/yourCityDark";
import { useSelector } from "react-redux";
import "./App.css";

function App() {

  const backMode = useSelector((state) => state.backMode.backMode);

  return (
    <>
      {backMode === "light" ? <YourCityLight /> : <YourCityDark />}
    </>
  );
}

const apiKey = "ce916057fd825bd31ff8b2656372f0ba";

export default App;
