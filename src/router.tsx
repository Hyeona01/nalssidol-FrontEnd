import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Mainpage from "./pages/mainpage/Mainpage";
import NotFound from "./NotFound";
import { Weather } from "./openAPI/Weather";
import SelectAuto from "./pages/areaSelect/SelectAuto";
import Temperature from "./openAPI/Temperature";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Mainpage />,
      },
      {
        path: "weather",
        element: <Weather />,
      },
      {
        path: "select",
        element: <SelectAuto />,
      },
      {
        path: "test",
        element: <Temperature />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
