import AppRouter from "./AppRouter";
import { getToken, setToken } from "./features/Auth/AuthSlice";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import LoaderScreen from "./features/LoaderScreen/LoaderScreen";
import RouteChangeTracker from "./RouteChangeTracker";


function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);

  const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
  ReactGA.initialize(TRACKING_ID);


  useEffect(() => {
    const token = getToken();
    dispatch(setToken(token))
    booststrapAxios(token)
    setLoading(false);
  }, [token, dispatch]);

  if (loading) {
    return <LoaderScreen />
  }

  return (
    <div className="App">
      <RouteChangeTracker />
      <AppRouter />
    </div>
  )
}


const booststrapAxios = function (token) {
  // console.log("bootstrap", token)
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  // console.log(axios.defaults.baseURL);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
    /*if setting null does not remove `Authorization` header then try  */
    delete axios.defaults.headers.common['Authorization'];
  }
};


export default App;
