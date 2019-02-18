(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var nxWxPromisify = nx.wxPromisify || require('next-wx-promisify');
  var wx = global.wx;

  var NxWeappAuth = nx.declare('nx.WeappAuth', {
    statics: {
      // todo: has bug?
      auth: function() {
        var self = this;
        return new Promise(function(resolve) {
          self.checkSession().then(function(response) {
            var code = response.code;
            if (code !== 0) {
              self.login().then(function(response) {
                resolve(response);
              });
            }
          });
        });
      },
      login: function() {
        return new Promise(function(resolve, reject) {
          var options = nxWxPromisify(resolve, reject);
          wx.login(options);
        });
      },
      checkSession: function() {
        return new Promise(function(resolve, reject) {
          var options = nxWxPromisify(resolve, reject);
          wx.checkSession(options);
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappAuth;
  }
})();
