import AppRouter from "./AppRouter";
import axios from 'axios';
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import LoaderScreen from "./features/LoaderScreen/LoaderScreen";
import { getToken, getUser, logoutUser } from "./features/Auth/AuthSlice";
import { getCommonData } from "./features/CommonSlice";

import './App.scss'
import { initializeAnalytics } from "./firebaseConfig";

initializeAnalytics();

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const localToken = getToken();
  booststrapAxios(localToken, dispatch);

  // //the token here is to refresh the router when the token changes
  // const token = useSelector(state => state.auth.token);

  useEffect(() => {

    console.log("here")
    if (localToken) {
      const _1 = dispatch(getUser());
      const _2 = dispatch(getCommonData());
      Promise.all([_1, _2]).then(() => {
        setLoading(false);
      }).catch((e) => {
        alert(e.message);
      });
    } else {
      setLoading(false);
    }
    //the token here is to refresh the router when the token changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {loading ?
        <LoaderScreen /> :
        < React.Suspense fallback={<LoaderScreen />}>
          <AppRouter />
        </React.Suspense>
      }
    </div>
  )
}


const booststrapAxios = function (token, dispatch) {

  axios.defaults.headers.common['x-brand-id'] = process.env.REACT_APP_BRAND_ID;
  axios.defaults.headers.common['x-request-env'] = process.env.REACT_APP_REQUEST_ENV;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
    delete axios.defaults.headers.common['Authorization'];
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      console.log(error.config.url, error.message);

      if (error.response && error.response.status === 401) {
        dispatch(logoutUser())
      }
      return Promise.reject(error);
    });

};


export default App;
