import React, {
  FC,
  useEffect,
  useState,
} from "react";
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
  const [privilegeLevel, setPrivilegeLevel] = privilegeLevelDispatcher;
  const [isTokenValid, setIsTokenValid] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      const controller: AbortController = new AbortController();
      const { signal }: AbortController = controller;
      try {
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/verify-token`,
          {
            method: "POST",
            headers: {
              "Authorization": window.localStorage.token,
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            signal: signal,
            cache: "no-store",
          },
        );
        const { status }: Response = res;
        if (status !== 200) {
          setPrivilegeLevel("unlogged");
        } else {
          setIsTokenValid(true);
        }
      } catch (err) {
        controller.abort();
        setPrivilegeLevel("unlogged");
      }
    };
    if (window.localStorage.token) {
      verifyToken();
    } else {
      setIsTokenValid(false);
    }
  }, [setPrivilegeLevel]);
  return isTokenValid || privilegeLevel === "unlogged"
    ? (<Route
      {...rest}
      render={(routeProps): JSX.Element =>
        forPrivilegeLevelAndHigher === privilegeLevel ||
        privilegeLevel === "admin"
          ? component
            ? createElement(component as ElementType, routeProps)
            : <></>
          : forPrivilegeLevelAndHigher === "admin"
          ? <Error404 {...routeProps} />
          : <Redirect
            to={{ pathname: "/login", state: { from: routeProps.location } }}
          />}
    />)
    : <></>;
};

export default PrivateRoute;
