const dotenv = require("dotenv");
const WebSocket = require("ws");
const { broadcast } = require("../p2p/p2pServer");

dotenv.config();

const stockConnect = () => {
  // ws 접속용 websocket
  let w;
  try {
    url = "ws://ops.koreainvestment.com:21000";
    //url = "ws://ops.koreainvestment.com:31000";		//모의투자

    w = new WebSocket(url);
  } catch (error) {
    console.log(error);
  }

  w.onopen = function () {
    console.log("[Connection OK]");

    sendAuth();
  };

  w.onclose = function (e) {
    console.log("[CONNECTION CLOSED]");
  };

  w.onmessage = function (e) {
    let recvdata = filterUnicode(e.data);
    console.log(e.data);
    broadcast(e.data);

    if (recvdata[0] == 0 || recvdata[0] == 1) {
      let strArray = recvdata.split("|"); // 구분자로 문자열 자르기

      // let trid = strArray[1]; // Tr ID
      let bodydata = strArray[3]; // 수신받은 데이터 중 실시간데이터 부분
      console.log("------", bodydata); // data 확인 후 return
    }
  };

  const sendAuth = () => {
    const result =
      '{"header": {"authoriztion":"","appkey":"' +
      process.env.G_APP_KEY +
      '","appsecret":"' +
      process.env.G_APPSECRET +
      '","personalseckey":"' +
      process.env.G_PERSONALSECKEY +
      '","custtype":"P","tr_type":"1","content-type":"utf-8"},"body": {"input": {"tr_id":"H0STASP0","tr_key":"' +
      "" +
      '"}}}';

    w.send(result);
  };

  let escapable =
    /[\x00-\x1f\ud800-\udfff\u200c\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;

  const filterUnicode = quoted => {
    escapable.lastIndex = 0;
    if (!escapable.test(quoted)) return quoted;

    return quoted.replace(escapable, a => {
      return "";
    });
  };
};

module.exports = {
  stockConnect,
};
