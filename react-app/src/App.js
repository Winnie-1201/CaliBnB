import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import Test from "./components/auth/Test";
import { getAllSpotThunk } from "./store/spots";
import Homepage from "./components/Homepage";

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
        <Route path="/test" exact={true}>
          <Test />
        </Route>
        <Route path="/" exact={true}>
          <Homepage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
