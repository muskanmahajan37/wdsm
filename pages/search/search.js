var api = require('../../utils/api.js');
var WxSearch = require('../../wxSearch/wxSearch.js');

Page({
  data: {
    wxSearchData: {
      his: [],
    },
    keywords: ["raspberry pi", "amazon echo", "rgb led", "nginx", "ubuntu", "rpi", "faxumo", "python", "wemo", "mesh", "mesh iot", "lamp", "esp8266", "martrix creator", "nodemcu", "google home", "ifttt", "nodejs", "diy", "3d printer", "alexa", "raspberry pi zero", "siri", "homekit", "homebridge", "openwrt", "home automation", "avr", "atmega8", "tensorflow", "home assistant", "miio", "lora", "iot", "arm", "embed", "lorawan", "arduino", "sniffer", "lora1276", "rn2483", "cortana", "rgb", "broadlink", "philips hue", "esp8266 emulator", "opnehab", "ngrok", "respeaker", "wio link", "天猫精灵", "tmall", "tmall x1", "broadlink rm pro", "aligenie", "sp mini", "python-broadlink", "broadlink rm", "esp8266 wifi", "esp8266-homeki", "wolfssl", "ubidots", "pycom", "hc-05", "android", "vocie", "snowboy", "trulyhandsfree", "avs", "amazon", "pyaudio", "sox", "arty", "wearable", "ws2812", "siricontrol", "led", "gmail", "ios", "particle", "particle photon", "pluse sensor", "temperature sensor", "wifi", "wifi jammer", "hack", "smtp", "gmail sender", "ft232", "mqtt", "micropython", "adafruit", "subpub", "subscribe", "publish", "wipy", "lopy", "sipy", "PiAUISuite", "Wiring Pi", "Voice Command", "voicecommand", "docker", "docker swarm", "faas", "openfaas", "snips", "snips spkr", "spotify", "tts", "neopixel", "raspbian", "bazel", "swapfile", "avs device sdk", "alexa sdk", "amazon voice services", "c", "windows 10", "amazon alexa", "raspberry pi 3", "arduino yun", "linino", "bridge", "Linux Linino", "opencv", "openalpr", "Tesseract OCR", "homebridge-http-temperature-humidity", "lm35", "arduin yun", "bootstrap", "jquery", "lcd", "johnny-five", "raspi-io", "firmata", "StandardFirmataWiFi", "EtherPortClient", "iotjs", "jerryscript", "javascript", "raspberrypi", "blynk", "homematic", "mqtt-admin", "node-redmosquitto", "websockets", "pebble", "smartwatch", "smart home", "ethereum", "blockchain", "arduino uno", "scala", "mosquitto", "java", "mesos", "kubernetes", "telegram", "bot", "mongoose os", "losant", "aws iot", "leap motion", "cylon", "cylonjs", "sphero", "esp32", "thread", "门铃", "blink", "ionic", "flasherjs", "espruino", "processing", "serial", "ble", "core bluetooth", "at", "google cloud iot core", "bigquery", "firebase", "datastudio", "serverless", "aws lambda", "aws", "dynamodb", "echo dot", "MobyMingle", "api-gateway microservices api-management apis iot docker service-discovery service-mesh", "coucbdb", "elasticsearch", "logstash", "kibana", "openwhisk", "node-red", "lambda", "monitor", "serverless notifications", "notifications", "amazon aws", "serverless skill", "apex", "sonos", "ps4", "twilio", "ota", "arduinoota", "belkin", "google assistant", "smart speaker", "arduino ide", "espeasy", "homepie", "homie", "dht22", "minecraft", "spigot", "webui", "homebridge-server", "mote", "home automatic", "flask", "json", "ir", "openhab", "go tensorflow", "go", "keras", "car", "auto car", "ai", "autocar", "kittycam", "cat", "golang", "pi", "kotlin", "raspbian lite", "prometheus", "node exporter"]
  },

  onLoad() {
    var that = this;

    this.getHis();
    WxSearch.init(that, 43, ['智能家居', 'AI', '智能音箱', '物联网', '自动驾驶']);
    WxSearch.initMindKeys(this.data.keywords);
  },
  onItemClick(e) {

  },
  wxSearchFn: function (e) {
    let that = this;
    WxSearch.wxSearchAddHisKey(that);
    let keyword = e.target.dataset.key;
    this.searchByKeywords(keyword);
  },
  wxSearchInput: function (e) {
    let that = this;
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    let that = this;
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    let that = this;
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    let that = this;
    WxSearch.wxSearchKeyTap(e, that);
    let keyword = e.target.dataset.key;
    this.searchByKeywords(keyword);
  },
  wxSearchDeleteKey: function (e) {
    let that = this;
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    let that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    let that = this;
    WxSearch.wxSearchHiddenPancel(that);
  },
  clearInput: function() {
    let originSearchData = this.data.wxSearchData;
    console.log(this.data.wxSearchData)
    originSearchData.value = ''
    originSearchData.mindKeys = []
    this.setData({
      wxSearchData: originSearchData
    })
  },
  searchByKeywords: function (keyword) {
    this.updateHis(keyword);
    wx.navigateTo({
      url: '/pages/list/list?keyword=' + keyword
    })
  },
  getHis: function(){
    let that = this;
    wx.getStorage({
      key: 'his',
      success: function(res) {
        console.log(res.data)
        let originSearchData = this.data.wxSearchData;
        originSearchData.his = JSON.parse(res.data);
        console.log(res.data)
        that.setData({
          wxSearchData: originSearchData
        })
      }
    })
  },
  updateHis: function(his){
    let oldHis = this.data.wxSearchData.his;
    if(!oldHis) {
      oldHis = [];
    }
    oldHis.push(his);
    wx.setStorage({
      key:"his",
      data:oldHis
    })
  }
});
