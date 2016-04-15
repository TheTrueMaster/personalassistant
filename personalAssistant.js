email = "youremail"
password = "yourpassword"
//don't worry, no one except you can see that
var login = require("facebook-chat-api");

//preferences
var echo = false
var obamaLink = "404 NOT FOUND";
// Create simple echo bot
login({email: email, password: password}, function callback (err, api) {
  if(err) return console.error(err);

  api.listen(function callback(err, message) {
    var msg = getMessage(message.body);

    api.sendMessage(msg, message.threadID);
  });
});

function getMessage(msg) {
  if (msg == "help"){
    var str = "Here are my commands: \n";
    str += "obama message (returns a video of obama saying the message\n";
    str += "echo on (turns on the echo bot)\necho off (turns off the echo bot)";
    return str;
  }
  else if (msg.toUpperCase() == "ECHO ON") {
    echo = true;
    return "echo on"
  }
  else if (msg.toUpperCase() == "ECHO OFF") {
    echo = false;
    return "echo off"
  }
  else if (echo) {
    return msg;
  }
  else if (getFirstWord(msg) == "obama") {
    obama(msg.substr(msg.indexOf(" ") + 1));
    setTimeout(function(){},2000);
    return obamaLink;
  }
}

function getFirstWord(str) {
  if (str.indexOf(' ') === -1){
    return str;
  }
  else{
    return str.substr(0, str.indexOf(' '));
  }
};

function backend(data){
  var request = require('request')
  request.post('http://talkobamato.me', {
    form: {
      input_text: data,
      button: 'Talk!'
    }
  }, function (err, res, body) {
    front = body.indexOf("http://talkobamato.me/");
    length =  (body.indexOf('">here</'))-front;
    callback(body.substr(front, length));
  })
}

function obama(msg) {
    //other logic
    backend(msg);
}
function callback(url) {
    obamaLink = url;
}
