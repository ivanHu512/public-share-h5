let u = navigator.userAgent;
function setupWebViewJavascriptBridge(callback) {
  if (!/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    //Android使用
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function () {
          callback(window.WebViewJavascriptBridge);
        },
        false
      );
    }
  } else { //IOS使用
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}
//注册回调函数，安卓
setupWebViewJavascriptBridge((bridge) => {
  if (!/(iPhone|iPad|iPod|iOS)/i.test(u)) {
    //android 有init初始化方法，必须调用 不调用后续注册的事件将无效 而IOS却没有init方法 调用会报错 
    bridge.init((message, responseCallback) => {
      var data = { "Javascript Responds": "Wee!" };
      console.log(message);
      responseCallback(data);
    });
  }
});

export default {
  callhandler(name, data, callback) {
    // 调用客户端的方法 
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  registerhandler(name, callback) {
    // 客户端需要调用的js函数
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  },
}