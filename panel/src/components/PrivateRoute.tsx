import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { useContext, ElementType, createElement } from "react";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsAuthorizedDispatcher,
} from "../contextes/globalContext";

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component, ...rest }: PrivateRouteProps = props;
  const { isAuthorizedDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isAuthorized]: IsAuthorizedDispatcher = isAuthorizedDispatcher;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthorized
          ? component
            ? createElement(component as ElementType, routeProps)
            : <></>
          : <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />}
    />
  );
};

export default PrivateRoute;
