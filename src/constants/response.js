module.exports = {
  SUCCESS_200       : (data) => {
    return {msg: '200: Success', body: data}
  },
  NOT_AUTHORIZED_403: (data) => {
    return {msg: '403: User is not authorized to access this data', body: data}
  },
  NOT_FOUND_404     : (data) => {
    return {msg: '404: The resource was not found', body: data}
  },
};
