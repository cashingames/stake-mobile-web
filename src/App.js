import AppRouter from "./AppRouter";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import LoaderScreen from "./features/LoaderScreen/LoaderScreen";
import { getToken, getUser } from "./features/Auth/AuthSlice";
import { getCommonData } from "./features/CommonSlice";

import './App.scss'
import { initializeAnalytics } from "./firebaseConfig";
import { setupAxios } from "./utils/utils";

initializeAnalytics();

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const localToken = getToken();
  setupAxios(localToken, dispatch);

  useEffect(() => {

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



export default App;
