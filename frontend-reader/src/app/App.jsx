import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { createContext, useState } from "react";
import routes from "./router";

const router = createBrowserRouter(createRoutesFromElements(routes));

export const UserTokenContext = createContext();

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <UserTokenContext.Provider value={{ token, setToken }}>
      <RouterProvider router={router} />
    </UserTokenContext.Provider>
  );
};

export default App;
