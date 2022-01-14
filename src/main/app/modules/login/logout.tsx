import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../config/store";
import { login } from "../../shared/reducers/authentication";

export const Logout = (props: RouteComponentProps<any>) => {
    return <div>Logout Page</div>;
};

export default Logout;
