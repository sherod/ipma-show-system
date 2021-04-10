import React, { Suspense, lazy } from "react";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import Cookies from "universal-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
//import Admin from "./admin/Admin";
import Help from "./help/Help";
import Navigation from "./navigation/Navigation";
import UnauthenticatedHome from "./UnauthenticatedHome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchEntrant, makeAdmin } from "./features/entries/entriesSlice";
import { useDispatch } from "react-redux";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Container, Spinner } from "react-bootstrap";

Amplify.configure(awsconfig);

const Home = lazy(() => import("./home/Home"));
const Admin = lazy(() => import("./admin/Admin"));

function Footer(props) {
  return (
    <Container>
      By entering, you agree to the{" "}
      <a href="https://ipmamodels.net/competition-rules/" target="_new">
        competition rules.
      </a>{" "}
      Our privacy policy is simple: we only use your information to administer
      the show.
    </Container>
  );
}

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      Auth.currentAuthenticatedUser().then((user) => {
        dispatch(fetchEntrant(user));
        const cookies = new Cookies();
        cookies.set("nextAuthState", "signin", { path: "/" });
        let groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups !== undefined) {
          dispatch(makeAdmin(groups.includes("admin")));
        } else {
          dispatch(makeAdmin(false));
        }
      });
    }

    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, [dispatch, authState, user]);

  return authState === AuthState.SignedIn && user ? (
    <Router>
      <Navigation />
      <Suspense
        fallback={
          <Container>
            <Spinner />
          </Container>
        }
      >
        <Switch>
          <Route path="/mng">
            <Admin />
          </Route>
          <Route path="/help" component={Help} />

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route path="/">
          <UnauthenticatedHome />
        </Route>
        <Route path="/help">
          <Help />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
