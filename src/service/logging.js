const UserAction = require('../schema/userAction');
const ApiError   = require('../schema/ApiError');

module.exports.logUserAction = (data) => {
  if (
    data.userID &&
    data.action &&
    data.ip
  ) {
    const userActionData = {
      userID  : data.userID,
      targetID: data.targetID || null,
      ip      : data.ip,
      action  : data.action,
      date    : new Date(),
    };
    UserAction.create(userActionData, function (error) {
      if (error) {
        // console.log('userActionLog error:', error)
      } else {
        // console.log('userActionLog success', userActionData)
      }
    });
  } else {
    // console.log(`logUserAction: userID or action type not provided. userID: ${data.userID} action: ${data.action}`)
  }
};

module.exports.logApiError = (data) => {
  if (
    data.userID &&
    data.action &&
    data.code &&
    data.error &&
    data.ip
  ) {
    const apiErrorData = {
      action: data.action,
      userID: data.userID,
      code  : data.code,
      error : data.error,
      ip    : data.ip,
      date  : new Date(),
    };
    ApiError.create(apiErrorData, function (error) {
      if (error) {
        // console.log('userActionLog error: ', error)
      } else {
        // console.error('logApiError success: ', apiErrorData)
      }
    });
  } else {
    console.error(`logApiError: userID or action type not provided. userID: ${data.userID} action: ${data.action}`)
  }
};