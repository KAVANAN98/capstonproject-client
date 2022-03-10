import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigationbar from "./components/Navigationbar";
import { Route, Switch } from "react-router-dom";
import Loginpage from "./components/Loginpage";
import RegistrationPage from "./components/RegistrationPage";
import Samples from "./components/Samples";
import ProtectedRoute from "./components/Protected Routes";

function App() {
  return (
    <>

      <Switch>
        <Route exact path="/" component={Loginpage} />
        <ProtectedRoute exact path="/Samples" component={Samples} />
        <ProtectedRoute exact path="/RegistrationPage" component={RegistrationPage} />
      </Switch>

    </>
  );
}

export default App;
