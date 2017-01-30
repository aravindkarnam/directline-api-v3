var request = require('request');
var Rx = require('rxjs/Rx');
var WebSocket = require('ws');

function BotConnect() {
    this.baseUrl = 'http://directline.botframework.com/v3/directline/';
}
BotConnect.prototype.getBaseUrl = function () {
    return this.baseUrl;
}
BotConnect.prototype.getTokenObject = (secret) => {
    return Rx.Observable.create(observer => {
        request({
            method: 'POST',
            url: 'https://directline.botframework.com/v3/directline/tokens/generate',
            headers: {
                'Authorization': 'Bearer ' + secret
            }
        }, function (err, response, body) {
            if (err) {
                observer.error(err);
                observer.complete();
            }
            if (response.statusCode === 200) {
                observer.next(JSON.parse(body));
                observer.complete();
            }
            else {
                observer.error(response.statusCode + " error ");
                observer.complete();
            }
        })

    })
}
BotConnect.prototype.initConversationStream = (TokenObject) => {
    return Rx.Observable.create(observer => {
        request({
            method: 'POST',
            url: 'https://directline.botframework.com/v3/directline/conversations',
            headers: {
                'Authorization': 'Bearer ' + TokenObject.token
            }
        }, function (err, response, body) {
            if (err) {
                observer.error(err);
                observer.complete();
            }
            if (response.statusCode === 200 || 201) {
                var ws = new WebSocket(JSON.parse(body).streamUrl);
                ws.on('message', function (data, flags) {
                    if(JSON.parse(data).activities[0].from.id!==TokenObject.conversationId)
                    observer.next(JSON.parse(data).activities[0].text);
                });
                ws.on('close', function close() {
                    observer.complete();
                });
            }
            else {
                observer.error(response.statusCode + " error ");
                observer.complete();
            }
        })

    })
}
BotConnect.prototype.sendMessage = (TokenObject, message) => {
    return Rx.Observable.create(observer => {
        request({
            method: 'POST',
            url: "https://directline.botframework.com/v3/directline/conversations/" + TokenObject.conversationId + "/activities",
            headers: {
                'Authorization': 'Bearer ' + TokenObject.token
            },
            json:true,
            body: {
                "type": "message",
                "from": {
                    "id": TokenObject.conversationId,
                },
                "text": message
            }
        }, function (err, response, body) {
            if (err) {
                observer.error(err);
                observer.complete();
            }
            if (response.statusCode === 200 || 201) {
                observer.next(body);
                observer.complete();
            }
            else {
                observer.error(response.statusCode + " error ");
                observer.complete();
            }
        })

    })
}
BotConnect.prototype.endConversation = (TokenObject) => {
    return Rx.Observable.create(observer => {
        request({
            method: 'POST',
            url: "https://directline.botframework.com/v3/directline/conversations/" + TokenObject.conversationId + "/activities",
            headers: {
                'Authorization': 'Bearer ' + TokenObject.token
            },
            json:true,
            body: {
                "type": "endOfConversation",
                "from": {
                    "id": TokenObject.conversationId,
                }
            }
        }, function (err, response, body) {
            if (err) {
                observer.error(err);
                observer.complete();
            }
            if (response.statusCode === 200 || 201) {
                observer.next(body);
                observer.complete();
            }
            else {
                observer.error(response.statusCode + " error ");
                observer.complete();
            }
        })

    })
}
module.exports = new BotConnect();