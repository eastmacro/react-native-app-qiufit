/**
 * Created by guguyanhua on 12/22/15.
 */
import request from 'superagent';
var prefix = require('superagent-prefix')('https://api.weixin.qq.com/sns/');
const ID = 'wxb401408ecbea2897';
const SECRET = 'f1b0fa1255dcbec48cd24d82edcd8ae7';
class WeChat {
  getAccessToken(code, success, fail) {
    request
        .get('/oauth2/access_token')
        .query({appid: ID})
        .query({secret: SECRET})
        .query({code: code})
        .query({grant_type: 'authorization_code'})
        .use(prefix)
        .end(function (err, res) {
          res.body = res.body || JSON.parse(res.text);
          if (err && fail) {
            fail(err);
          } else if (fail && res.status !== 200) {
            fail({code: 401, msg: '不是200'});
          } else if (success) {
            //TODO saveToken and openId

            success(res.body);
          }
        });
  }

  getUserInfo(openId,accessToken){

  }
}

export default new WeChat();