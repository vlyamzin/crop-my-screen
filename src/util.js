/**
 * Get browser name from user agent
 * @returns {string}
 */
function getUserAgent() {
  let ua;
  const sUsrAg = navigator.userAgent;

  if (sUsrAg.indexOf('Firefox') > -1) {
    ua = 'Firefox';
  } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
    ua = 'Samsung Internet';
  } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
    ua = 'Opera';
  } else if (sUsrAg.indexOf('Trident') > -1) {
    ua = 'IE';
  } else if (sUsrAg.indexOf('Edge') > -1) {
    ua = 'EdgeLegacy)';
  } else if (sUsrAg.indexOf('Edg') > -1) {
    ua = 'Edge';
  } else if (sUsrAg.indexOf('Chrome') > -1) {
    ua = 'Chrome';
  } else if (sUsrAg.indexOf('Safari') > -1) {
    ua = 'Safari';
  } else {
    ua = 'unknown';
  }
  return ua;
}

/**
 * Get distance between the browser top-left corner and the top-left corner of the main monitor
 * @returns {{top: number, left: number}}
 */
function getScreenOffset() {
  return {
    // includes the browser's tab bar
    top: window.screenY + getBrowserHeaderSize(),
    left: window.screenX < 0 ? 0 : window.screenX
  };
}

/**
 * Get the browser top bar size
 * IMPORTANT - THIS METHOD IS NOT IDEAL AS IT ALSO COUNTS THE BROWSER BOTTOM BAR IF IT EXISTS
 * @returns {number}
 */
function getBrowserHeaderSize() {
  return window.outerHeight - window.innerHeight;
}

/**
 * Get aspect ration
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
function getRatio(width, height) {
  return (width > height) ? (width / height) : (height / width);
}

/**
 * Add plugin prefix to the string id
 * @param {string} id
 * @returns {string}
 */
function withPrefix(id) {
  return `${window.CropMyScreen.prefix}-${id}`;
}

/**
 * Call callback function with provided parameters
 * @param {Function} callback
 * @param {any} params
 */
function doCallback (callback, params) {
  if (callback && typeof callback === 'function') {
    callback.call(this, params);
  }
}


export {getUserAgent, getBrowserHeaderSize, getScreenOffset, getRatio, withPrefix, doCallback};
