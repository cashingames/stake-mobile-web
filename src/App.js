import AppRouter from "./AppRouter";
import { getToken, setToken } from "./features/Auth/AuthSlice";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import LoaderScreen from "./features/LoaderScreen/LoaderScreen";
import firebaseConfig from "./firebaseConfig";
firebaseConfig();

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);

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
      <React.Suspense fallback={<LoaderScreen />}>
        <AppRouter />
      </React.Suspense>

    </div>
  )
}


const booststrapAxios = function (token) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
    delete axios.defaults.headers.common['Authorization'];
  }
};


export default App;
