import { AuthStore } from "@contexts/AuthStore";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

export default function withGaurd(Component) {
  return function WrapperComponent({ props }) {
    const { user } = useContext(AuthStore);
    if (!user) {
      return <Redirect to="/" />;
    }
    return <Component {...props} />;
  };
}
