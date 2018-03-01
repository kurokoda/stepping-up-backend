import config from '../../config';

const proxy = getProxy();

function getProxy() {
  switch (config.API_TYPE) {
    case 'firebase':
      return require('./firebase');
    case 'mongoose':
      return require('./mongoose');
    default :
    // Add error handling here
  }
}

export const LOG_IN  = proxy.LOG_IN;
export const LOG_OUT = proxy.LOG_OUT;

