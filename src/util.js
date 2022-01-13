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

// returns the distance between the browser top-left corner and the top-left corner of the main monitor
function getScreenOffset() {
  return {
    // includes the browser's tab bar
    top: window.screenY + getBrowserHeaderSize(),
    left: window.screenX < 0 ? 0 : window.screenX
  };
}

function getBrowserHeaderSize() {
  return window.outerHeight - window.innerHeight;
}


export {getUserAgent, getBrowserHeaderSize, getScreenOffset};
