import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useContext, ElementType, createElement } from "react";
import GlobalContext, {
  GlobalContextCompleteValues,
} from "../contextes/globalContext";
import Error404 from "../pages/Error404";

interface PrivateRouteProps extends RouteProps {
  forPrivilegeLevelAndHigher: "admin" | "student";
}

const PrivateRoute: FC<PrivateRouteProps> = (
  {
    component,
    forPrivilegeLevelAndHigher,
    ...rest
  }: PrivateRouteProps,
): JSX.Element => {
  const { privilegeLevelDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [privilegeLevel] = privilegeLevelDispatcher;
  return (
    <Route
      {...rest}
      render={(routeProps): JSX.Element =>
        forPrivilegeLevelAndHigher === privilegeLevel ||
        privilegeLevel === "admin"
          ? component
            ? createElement(component as ElementType, routeProps)
            : <></>
          : forPrivilegeLevelAndHigher === "admin"
          ? <Error404 />
          : <Redirect
            to={{ pathname: "/login", state: { from: routeProps.location } }}
          />}
    />
  );
};

export default PrivateRoute;
