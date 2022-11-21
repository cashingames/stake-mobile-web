import AppRouter from "./AppRouter";
import { getToken, setToken } from "./features/Auth/AuthSlice";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector(state=>state.auth.token);

  useEffect(()=> {
      const token = getToken();
      dispatch(setToken(token))
      booststrapAxios(token)
      setLoading(false);
  }, [token]);

  if(loading)
    return <div>Loading...</div>
  
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
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
