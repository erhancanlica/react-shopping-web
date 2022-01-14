import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../config/store";
import { login } from "../../shared/reducers/authentication";

export const Login = (props: RouteComponentProps<any>) => {
    return <div>Login Page</div>;
};

export default Login;
