import React from "react";

import LoginInputs from "../components/auth/LoginInputs.jsx";
import RegisterInputs from "../components/auth/RegisterInputs.jsx";

function AuthPage() {
  return <>
    <h2>LOGIN</h2>
    <LoginInputs />
    <h2>REGISTER</h2>
    <RegisterInputs />
  </>
}

export default AuthPage;
