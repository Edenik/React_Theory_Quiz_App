import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Route, Switch } from "react-router-dom";
import Quiz from "./components/quizPage";
import ErrorPage from "./components/errorPage";
import HomePage from "./components/homePage";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/quiz" exact>
          <Quiz />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
