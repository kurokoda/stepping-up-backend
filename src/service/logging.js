const UserAction = require('../schema/userAction');
const ApiError   = require('../schema/ApiError');


module.exports.logUserAction = (data) => {
  if (
    data.userID &&
    data.action
  ) {
    const userActionData = {
      userID  : data.userID,
      targetID: data.targetID,
      action  : data.action,
      date    : new Date(),
    };
    UserAction.create(userActionData, function (err) {
      if (err) {
        console.log('userActionLog error:', err)
      } else {
        console.log('userActionLog success', userActionData)
      }
    });
  } else {
    console.log('logUserAction: Required data not provided')
  }
};

module.exports.logApiError = (data) => {
  console.log(data);
  if (
    data.action &&
    data.code &&
    data.error
  ) {
    const apiErrorData = {
      action: data.type,
      code  : data.code,
      error : data.action,
      date  : new Date(),
    };
    ApiError.create(apiErrorData, function (err) {
      if (err) {
        console.log('userActionLog error: ', err)
      } else {
        console.log('userActionLog success: ', apiErrorData)
      }
    });
  } else {
    console.log('NOT DOING IT', data);
  }
};