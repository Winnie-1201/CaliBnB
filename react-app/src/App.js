import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import { getAllSpotThunk } from "./store/spots";
import Homepage from "./components/Homepage";
import SpotDetalsPage from "./components/SpotDetailsPage";
import CreateSpot from "./components/Calibnb/CreateSpot";
import Account from "./components/Account";
import Calibnb from "./components/Calibnb";
import EditSpot from "./components/Calibnb/EditSpot";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAllSpotThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/spots/:spotId/edit" exact={true}>
          <EditSpot />
        </Route>
        <Route path="/users/calibnb" exact={true}>
          <Calibnb />
        </Route>
        <Route path="/users/profile" exact={true}>
          <Account />
        </Route>
        <Route path="/spots/current/new" exact={true}>
          <CreateSpot />
        </Route>
        <Route path="/spots/:spotId" exact={true}>
          <SpotDetalsPage />
        </Route>
        <Route path="/" exact={true}>
          <Homepage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
