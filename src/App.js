import AppRouter from "./AppRouter";
import { getToken, setToken } from "./features/Auth/AuthSlice";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import LoaderScreen from "./features/LoaderScreen/LoaderScreen";
import firebaseConfig from "./firebaseConfig";
import { logEvent } from "firebase/analytics";
// import { useReactPWAInstall } from "react-pwa-install";
// import appLogo from './assets/icons/app-icon.png'
// import AddToHomescreen from 'react-add-to-homescreen';

const analytics = firebaseConfig();
logEvent(analytics, "firebase_setup_complete");

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);

  // const { pwaInstall, supported, isInstalled } = useReactPWAInstall()
  // if(!isInstalled()){
  //   pwaInstall({
  //     title: "CashinGames Web App",
  //     description: "Play quiz and win cash prices. We have all categories of trivia such as Movies, Hollywood, Nollywood, Food, Music that will engage your brain to keep playing the game.",
  //     features: (
  //       <ul>
  //         <li>Play quiz and win cash prices</li>
  //       </ul>
  //     ),
  //     logo: appLogo
  //   }).then(()=> alert("App installed")).catch(()=> alert("App not installed"))
  // }

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
      {/* <RouteChangeTracker /> */}
      {/* <AddToHomescreen onAddToHomescreenClick={()=>{}} /> */}
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
