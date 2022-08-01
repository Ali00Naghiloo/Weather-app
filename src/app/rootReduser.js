import forcasts from "../features/forcastReduser";
import backMode from "../features/backModeRduser";
import hourlyWeather from "../features/hourlyReduser";
import tempUnit from "../features/tempUnitSlice";
import coordsSlice from "../features/coordsSlice";

const rootReducer = {
    forcasts,
    backMode,
    hourlyWeather,
    tempUnit,
    coordsSlice,
}

export default rootReducer