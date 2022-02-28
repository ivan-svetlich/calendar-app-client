import React from "react";
import { Navigate, RouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export type ProtectedRouteProps = {} & RouteProps;

function PrivateRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn: boolean = !!useAppSelector((state) => state.user.data);

  return <> {isLoggedIn ? children : <Navigate to={`/login`} />} </>;
}

export default PrivateRoute;
