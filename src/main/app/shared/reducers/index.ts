import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";

import locale from './locale';
import authentication from './authentication';

const rootReducer = {
  authentication,
  locale,
  loadingBar,
};

export default rootReducer;
