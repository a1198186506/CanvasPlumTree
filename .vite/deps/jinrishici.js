// ../../../HBproject/MyPage/node_modules/jinrishici/jinrishici.js
var keyName = "94mgN7poRHQu2Hvui0KBb2DBtvK2LJgL";
function load(callback, errHandler) {
  if (window.localStorage && window.localStorage.getItem(keyName)) {
    return commonLoad(callback, errHandler, window.localStorage.getItem(keyName));
  } else {
    return corsLoad(callback, errHandler);
  }
}
function corsLoad(callback, errHandler) {
  const newCallBack = function(result) {
    window.localStorage.setItem(keyName, result.token);
    callback(result);
  };
  return sendRequest(newCallBack, errHandler, "https://v2.jinrishici.com/one.json?client=npm-sdk/1.0");
}
function commonLoad(callback, errHandler, token) {
  return sendRequest(callback, errHandler, "https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=" + encodeURIComponent(token));
}
function sendRequest(callback, errHandler, apiUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", apiUrl);
  xhr.withCredentials = true;
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      if (data.status === "success") {
        callback(data);
      } else {
        if (errHandler) {
          errHandler(data);
        } else {
          console.error("今日诗词API加载失败，错误原因：" + data.errMessage);
        }
      }
    }
  };
}
export {
  load
};
//# sourceMappingURL=jinrishici.js.map
