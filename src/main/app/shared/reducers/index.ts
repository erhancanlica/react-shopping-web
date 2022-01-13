import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";

import locale from "./locale";
import authentication from "./authentication";
import applicationProfile from "./application-profile";

const rootReducer = {
    authentication,
    locale,
    applicationProfile,
    loadingBar,
};

export default rootReducer;
