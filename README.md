# directline-api-v3
Connect to microsoft bot framework, directline through Version 3 APIs
## Install
```
npm install directline-api-v3

```
# usage
```javascript
var BotConnect = require('directline-api-v3');
```
## exchanging secret for a token
```javascript
  BotConnect.getTokenObject('add your app secret here').subscribe(
      (tokenObject)=>{
       console.log(tokenObject);
     },
     (err)=>console.log(err),
     ()=>console.log('complete')
  )
  ```
  >`getTokenObject(secret)` takes a string(your app secret) as input and returns an observable which inturn returns a tokenObject.
  A `TokenObject` returned by this observable will look like this and you will have to store this object for further operations.
  
  ```javascript
{ 
  conversationId: 'LtWoKPdC5pX37GL3zLrJnL',
  token: '3TL1kEsa6oY.dAA.TAB0AFcAbwBLAFAAZABDADUAcABYADMANwBHAEwAMwB6AEwAcgBKAG4ATAA.c93vfLV60gE.B8BJw8P6s60.O-8VJVii9WRlu0XrviYzwFES1ZG9ZhGld2QVa7OHSVo',
  expires_in: 1800 
  }
  ```
## starting a conversation and start receiving messages from bot through web socket.
```javascript
        BotConnect.initConversationStream(TokenObject).subscribe(
            (message)=>{
                  console.log(message);
            },
            (err)=>console.log(err),
            ()=>console.log("complete")
        )
    }
```
> `initConversationStream(TokenObject)` will take the `TokenObject` as input and return an oberservable that will inturn emit messages from the bot. Under the hood a web socket is setup for receiving messages from bot, when the bot closes the websocket you will receive a complete event from observable.
## sending a message to bot
```javascript
         BotConnect.sendMessage(TokenObject,"hello").subscribe(
                      next:(data)=>console.log(data),
                      error:(err)=>console.log(err),
                      complete:()=>console.log("complete")
)}
```
> `sendMessage(TokenObject,message)` will take the `TokenObject` and a string containing the message as input and return an observable using which you can test weather it was successfull. If your next call back gets called then the operation can be considered successful.
# This is a work in progress I will keep adding more features in near future. Thanks
