const getErrorMessage = (errorData) => {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.array.forEach((error) => {
      message += `\nfield: ${error.field},  Object: ${error.objectName}, message: ${error.message}\n`;
    });
  }
  return message;
};

export default () => (next) => (action) => {
  if (DEVELOPMENT) {
    const { error } = action;
    if (error) {
      console.error(
        `${action.type} caught at middleware with reason: ${JSON.stringify(
          error.message
        )}.`
      );
      if (error.response && error.response.data) {
        const message = getErrorMessage(error.response.data);
        console.error(`Actual cause: ${message}`);
      }
    }
  }
  // Dispatch initial action
  return next(action);
};
