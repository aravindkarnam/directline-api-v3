# directline-api-v3
Connect to microsoft bot framework, directline through Version 3 APIs
##install
npm install directline-api-v3
#usage
```javascript
var BotConnect = require('directline-api-v3');
```
##exchanging secret for a token
```javascript
  BotConnect.getTokenObject('add your app secret here').subscribe(
      (tokenObject)=>{
       console.log(tokenObject);
     }
     (err)=>console.log(err),
     ()=>console.log('complete')
  )
  ```
  >`getTokenObject(secret)` takes a string(your app secret) as input and returns an observable which inturn returns a tokenObject.
  >A `TokenObject` returned by this observable will look like this and you will have to store this object for further operations.
  
  ```javascript
{ 
  conversationId: 'LtWoKPdC5pX37GL3zLrJnL',
  token: '3TL1kEsa6oY.dAA.TAB0AFcAbwBLAFAAZABDADUAcABYADMANwBHAEwAMwB6AEwAcgBKAG4ATAA.c93vfLV60gE.B8BJw8P6s60.O-8VJVii9WRlu0XrviYzwFES1ZG9ZhGld2QVa7OHSVo',
  expires_in: 1800 
  }
  ```
 ##starting a conversation and start receiving messages from bot through web socket.
