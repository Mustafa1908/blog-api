import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import routes from "./router";

const router = createBrowserRouter(createRoutesFromElements(routes));

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
