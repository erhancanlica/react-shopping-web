import React, { useState, useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../config/store";
import { login } from "../../shared/reducers/authentication";

export const Home = (props: RouteComponentProps<any>) => {
    return <div>Home Page</div>;
};

export default Home;
