import AppRouter from "./AppRouter";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import LoaderScreen from "./features/LoaderScreen/LoaderScreen";
import firebaseConfig from "./firebaseConfig";
import { getToken, getUser, setToken } from "./features/Auth/AuthSlice";

import './App.scss'
import { getCommonData, initialLoadingComplete } from "./features/CommonSlice";

firebaseConfig();

function App() {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.common.initialLoading);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      dispatch(initialLoadingComplete());
      return;
    }

    console.log("Token found");
    dispatch(setToken(token));
    booststrapAxios(token);

    const _1 = dispatch(getUser());
    const _2 = dispatch(getCommonData());

    Promise.all([_1, _2]).then(() => {
      dispatch(initialLoadingComplete());
    }).catch((e) => {
      alert(e.message);
    });

  }, [dispatch]);



  if (loading) {
    return <LoaderScreen />
  }

  return (
    <div className="App">
      <React.Suspense fallback={<LoaderScreen />}>
        <AppRouter />
      </React.Suspense>

    </div>
  )
}


const booststrapAxios = function (token) {

  axios.defaults.headers.common['x-brand-id'] = process.env.REACT_APP_BRAND_ID;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
    delete axios.defaults.headers.common['Authorization'];
  }
};


export default App;
