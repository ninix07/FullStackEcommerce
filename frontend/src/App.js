import "./App.css";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/footer/Footer";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home/home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/products.js";
import Profile from "./component/User/Profile.js";
import Search from "./component/Search/Search.js";
import Login from "./component/User/login";
import UpdateProfile from "./component/User/UpdateProfile.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./component/Routes/ProtectedRoute";
import React from "react";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
function App() {
  const [authChecked, setAuthChecked] = React.useState(false);
  React.useEffect(() => {
    async function checkAuth() {
      await store.dispatch(loadUser());
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  if (authChecked) {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route exact path="/product/:id" Component={ProductDetails} />
          <Route exact path="/products" Component={Products} />
          <Route exact path="/products/:keyword" Component={Products} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/search" Component={Search} />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/account" Component={Profile} />
            <Route exact path="/me/update" Component={UpdateProfile} />
            <Route exact path="/password/update" Component={UpdatePassword} />
          </Route>
          <Route exact path="/password/forgot" Component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            Component={ResetPassword}
          />
        </Routes>

        <Footer />
      </Router>
    );
  }
}

export default App;
