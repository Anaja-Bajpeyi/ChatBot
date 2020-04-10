//chatbot library

var bot;
var i=0;
var a; //for storing email
var x; //for storing logs of user input
x=new Array();
//---------------------------------------------------------------------------------------------
var chatbot = {
  db: [],
  getDB2 :
    function json2array(json){
      var result = [];
      var keys = Object.keys(json);
      keys.forEach(function(key){
          result.push(json[key]);
      });
      return result;
  },
//-----------------------------------------------------------------------------------------------------------
  loadFiles: function(filenames) {
    bot = new RiveScript({utf8: true});
    bot.loadFile(filenames).then(on_load_success).catch(on_load_error);
  },
  //---------------------------------------------------------------------------------------------------------
  getReply: function(text) {
    bot.reply(null, text).then(
      reply => {
        reply = reply.replace(/\n/g, "<br>");
   this.postReply(reply);
      },
      reason => {
        console.log(reason);
      }
    );
  },
  //--------------------------------------------------------------------------------------------------------
  getReplyUser: function(text) {
    bot.reply(null, text).then(
      reply => {
        reply = reply.replace(/\n/g, "<br>");
   this.postReplyUser(reply);
      },
      reason => {
        console.log(reason);
      }
    );
  },
  //---------------------------------------------------------------------------------------------------------
check: function(arge){
  var request = new XMLHttpRequest();
  var api_file1 = 'http://13.228.141.24/mobile_api/chatbot/v1/getCustInfo.php?req='.concat(arge);
  request.open("GET", api_file1, true);
  request.onload = function()
  {
    //chatbot.postReply("I am in",2000);
    // Begin accessing JSON data here
      var data2 = JSON.parse(this.response);
      var reply="";

      if (request.status >= 200 && request.status < 400)
      {
          if(data2.data.email==arge || data2.data.tel==arge)
          {
            chatbot.postReply("The value you have entered\ntells me that you are our existing customer,\nplease login to continue\n the conversation",1000);
            chatbot.postReplyUser("REGISTERED CUSTOMERS<br/><br/><b>Email : </b>\n<input type="+"text"+" id="+"email"+" value="+data2.data.email+"><br/><br/><b>Password : </b><input type="+"password"+" id="+"code1"+"><br/><br/>",1000);
            chatbot.getReplyUser('enter the password');
          }
          else
          {
            reply= "Ah, you are New! \n So happy to have you";
            chatbot.postReply(reply,2000);
            setTimeout(function(){
            chatbot.getReply("op");
            }, 2200);
          }
      }
        else
        {
            reply= "Ah, you are New! \n So happy to have you";
            chatbot.postReply(reply,2000);
            setTimeout(function(){
            chatbot.getReply("op");
            }, 2200);
        }
    }
    request.send();
},
//---------------------------------------------------------------------------------------------------------
/*check: function(arge)
  {
    data = '[{"name":"abc",  "email":"a@b.com", "phone":9876543210},{"name":"qrs", "email":"q@r.com", "phone":9999999999}]';
    var mydata = JSON.parse(data);
    if(mydata[0].email==arge || mydata[0].phone==arge)
      {
        setTimeout(function(){
          chatbot.postReplyUser("REGISTERED CUSTOMERS<br/><br/><b>Email : </b>\n<input type="+"text"+" id="+"email"+" value="+mydata[0].email+"><br/><br/><b>Password : </b><input type="+"password"+" id="+"code1"+"><br/><br/>",1000);
          chatbot.getReplyUser('enter the password');
          }, 2000);
      }
      else if(mydata[1].email==arge || mydata[1].phone==arge)
      {
        setTimeout(function(){
          chatbot.postReplyUser("REGISTERED CUSTOMERS<br/><br/><b>Email : </b>\n<input type="+"text"+" id="+"email"+" value="+mydata[1].email+"><br/><br/><b>Password : </b><input type="+"password"+" id="+"code1"+"><br/><br/>",1000);
          chatbot.getReplyUser('enter the password');
          }, 2000);
      }
      else
          {
            //chatbot.WriteToFile(arge);
            reply= "You are New to site! \n Welcome to flavours of my city..!";
            chatbot.postReply(reply,2000);
            setTimeout(function(){
            chatbot.getReply("op");
            }, 2200);
          }
  },*/
  //-----------------------------------------------------------------------------------------------
check2: function()
{
  var x= document.getElementById("code1").value;
  var myPassword = "myPassword";
  var encrypted = CryptoJS.AES.encrypt(x, myPassword);
  var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
  y=decrypted.toString(CryptoJS.enc.Utf8);
  var request = new XMLHttpRequest();
  var api_file1 = 'http://13.228.141.24/mobile_api/chatbot/v1/getCustInfo.php?req='.concat(a)+'&test='.concat(encrypted);
  request.open("GET", api_file1, true);
  request.onload = function()
  {
    //chatbot.postReply("I am in",2000);
    // Begin accessing JSON data here
      var data2 = JSON.parse(this.response);
      var reply="";
      if(data2.data.cust_id==y)
      {
          reply= "Ah, " +data2.data.cust_name+" Welcome Back";
          chatbot.postReply(reply,2000);
          chatbot.order(data2.data.cust_id);
          setTimeout(function(){
          chatbot.getReply("op2");
          }, 3000);
      }
      else
      {
        reply= "The security code does not match..You are not the user" ;
        chatbot.postReply(reply,2000);
        setTimeout(function(){
          chatbot.getReply("op3");
          }, 3000);
      }
    }
    request.send();
},
//------------------------------------------------------------------------------------------------
order: function(arges)
{
  var request = new XMLHttpRequest();
  var api_file2 = 'http://13.228.141.24/mobile_api/chatbot/v1/getOrderHistory.php?userId='.concat(arges);
  request.open("GET", api_file2, true);
  request.onload = function()
  {
    // Begin accessing JSON data here
    var data3 = JSON.parse(this.response);
    var reply="";
    if (request.status >= 200 && request.status < 400)
    {
     if(data3.getOrderHistoryData[0].orderStatus=="delivered" || data3.getOrderHistoryData[0].orderStatus=="Completed"|| data3.getOrderHistoryData[0].orderStatus=="Shipped")
      {
        reply= '<b>'+"Last Order:  " +'</b>'+data3.getOrderHistoryData[0].orderDate+'<br/>'+'<b>'+"Order Status : "+'</b>'+data3.getOrderHistoryData[0].orderStatus+"."+'<br/>'+'<b>'+" Shipped to : \n"+'</b>'+data3.getOrderHistoryData[0].Shipping;
        chatbot.postReply(reply,2000)
      }

      if(data3.getOrderHistoryData[0].orderStatus=="canceled"||data3.getOrderHistoryData[0].orderStatus=="Cancelled")
      {
        reply="Ohh, you canceled your last order!";
        chatbot.postReply(reply,2000);
      }
      for(j=0;j<data3.getOrderHistoryData.length;j++)
      {
        if(data3.getOrderHistoryData[j].orderStatus=="Pending"|| data3.getOrderHistoryData[j].orderStatus=="Transit"||data3.getOrderHistoryData[j].orderStatus=="paid"|| data3.getOrderHistoryData[j].orderStatus=="Packed")
        {
          reply= '<b>'+"Order Placed On:  " +'</b>'+data3.getOrderHistoryData[j].orderDate+'<br/>'+'<b>'+"Order Status : "+'</b>'+data3.getOrderHistoryData[j].orderStatus+"."+'<br/>';
          chatbot.postReply(reply,2000);
          chatbot.put_dia1("Click Here to track your Order ","https://www.flavorsofmycity.com/order-track?trk_no=".concat(data3.getOrderHistoryData[0].orderId).concat("&tel_num=").concat(data3.getOrderHistoryData[0].contact),2000);
        }
        if(data3.getOrderHistoryData[j].orderStatus=="pending_payment")
        {
          reply= '<b>'+"Order Placed On:  " +'</b>'+data3.getOrderHistoryData[j].orderDate+'<br/>'+'<b>'+"Order Status : "+'</b>'+data3.getOrderHistoryData[j].orderStatus+"."+'<br/>'+'<br/>'+"You haven't made the payment after adding items to the cart...!"+'<br/>';
          chatbot.postReply(reply,2000);
        }
      }//End of For
    }
      /*today = new Date();
      sDate = new Date(data3.getOrderHistoryData[0].orderDate);
      var min = 1000*60; //------milliseconds*seconds------
      var hrs = min*60;
      var days = hrs*24;
      var year_s = days*365;
      var mday_s = Math.round(Math.abs((today.getTime() - sDate.getTime())/(days)));
      if(mday_s > 30)  //------Greater than 30 Days------
      {
        reply="Its been long since you made an order!!!";
        chatbot.postReply(reply,2000);
      }*/
      else
      {
        var reply= "Check connection";
        chatbot.postReply(reply, 2000);
        console.log('error');
      }
  }
  request.send();
},
//----------------------------------------------------------------------------------------------------------
put_dia1:function (str,url,delay)
{
  var rand = Math.round(Math.random() * 10000);
  setTimeout(function() {
    $("#dialogue").append(
      "<div class='bot-row' id='" +
        rand+
        "'><span class='bot'>" +
        str.link(url) +
        "</span></div>"
    );
    if (typeof pop !== "undefined") pop.play();
    if (typeof onChatbotReply === "function") onChatbotReply();
    $("#" + rand)
      .hide()
      .fadeIn(200);
  }, delay);
},
//-----------------------------------------------------------------------------------------------------------
  postReply: function(reply, delay) {
    if (!delay) delay = 1000;
    var rand = Math.round(Math.random() * 10000);
    setTimeout(function() {
      $("#dialogue").append(
        "<div class='bot-row' id='" +
          rand +
          "'><span class='bot'>" +
          reply +
          "</span></div>"
      );
      if (typeof pop !== "undefined") pop.play();
      if (typeof onChatbotReply === "function") onChatbotReply();
      $("#" + rand)
        .hide()
        .fadeIn(200);
    }, delay);
    $("#dialogue").animate({ scrollTop: $("#dialogue")[0].scrollHeight }, 200);
  },
  //-----------------------------------------------------------------------------------------------------------
  postReplyUser: function(reply, delay) {
    if (!delay) delay = 1000;
    var rand = Math.round(Math.random() * 10000);
    setTimeout(function() {
      $("#dialogue").append(
        "<div class='user-row' id='" +
          rand +
          "'><span class='user'>" +
          reply +
          "</span></div>"
      );
      if (typeof pop !== "undefined") pop.play();
      if (typeof onChatbotReply === "function") onChatbotReply();
      $("#" + rand)
        .hide()
        .fadeIn(200);
    }, delay);
    $("#dialogue").animate({ scrollTop: $("#dialogue")[0].scrollHeight }, 200);
  },
  //------------------------------------------------------------------------------------------------------------
  store2: function(argss){
    x[i]="FeedBack : "+argss;   //For storing Feedback logs
  },
  //------------------------------------------------------------------------------------------------------------
  store: function(argss){
    x[i]="Page Visited : "+argss;    //For storing Hyperlink logs
  },
  //------------------------------------------------------------------------------------------------------------
  writeDataToFile: function (d)   //for logs
  {
      var data = new FormData();
      var method = 'POST';
      var url = 'http://192.168.1.147/fomc/mobile_api/chatbot/v1/logData.php';
      console.log(d);
      data.append("data",d);
      var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
      xhr.open(method, url, true);
      xhr.onreadystatechange = function () {
          if(xhr.readyState === 4 && xhr.status === 200) {
              console.log(xhr.responseText);
          }
      };
      xhr.send(data);
  },
  //-----------------------------------------------------------------------------------------------------------
  sendMessage: function() {
    ++i;
   $("#dialogue").animate({ scrollTop: $("#dialogue")[0].scrollHeight }, 200);

    var text = $("#message").val();
    if (text.length === 0) return false;
    $("#message").val("");
    $("#dialogue").append(
      "<div class='user-row'><span class='user'>" +
        this.escapeHtml(text) +
        "</span></div>"
    );
    x[i]=text;//For Storing Logs of User inputs

    if(i==2)
    {
       var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
       var phoneno = /^\(?([1-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
       if (reg.test(text) == true || phoneno.test(text) == true)
        {
          this.getReply("true");
          a=text;
          this.check(text);
        }
       else
        {
          --i;
          this.getReply("false");
        }
      }
    else
    this.getReply(text);
    return false;

  },
  //-------------------------------------------------------------------------------------------
  escapeHtml: function(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },
};
//---------------------------------------------------------------------------------------------
function win_close()
{
  if(confirm("Do you want me to close the chat window?"))
    {
    setTimeout( window.close,10000);
    }
    chatbot.writeDataToFile(x);
}
//---------------------------------------------------------------------------------------------
window.addEventListener('beforeunload',function(event){

  chatbot.writeDataToFile(x);

});
//-------------------------------------------------------------------------------------------------
function on_load_success() {
  $("#message").removeAttr("disabled");
  $("#message").attr("placeholder", "Message");
  //$("#message").focus();
  bot.sortReplies();
  chatbot.getReply("hello");
}
//-------------------------------------------------------------------------------------------
function on_load_error(err) {
  chatbot.postReply(
    "Yikes, there was an error loading this bot. Refresh the page please."
  );
  console.log("Loading error: " + err);
}
//----------------------------------------------------------------------------------------------------------
/*
order: function(arges)
{
  var request = new XMLHttpRequest();
  var api_file2 = 'http://13.228.141.24/mobile_api/chatbot/v1/getOrderHistory.php?userId='.concat(arges);
  request.open("GET", api_file2, true);
  request.onload = function()
  {
    // Begin accessing JSON data here
    var data3 = JSON.parse(this.response);
    var reply="";
    if (request.status >= 200 && request.status < 400)
    {
     if(data3.getOrderHistoryData[0].orderStatus=="delivered" || data3.getOrderHistoryData[0].orderStatus=="Completed"|| data3.getOrderHistoryData[0].orderStatus=="Shipped")
      {
        reply= '<b>'+"Last Order:  " +'</b>'+data3.getOrderHistoryData[0].orderDate+'<br/>'+'<b>'+"Order Status : "+'</b>'+data3.getOrderHistoryData[0].orderStatus+"."+'<br/>'+'<b>'+" Shipped to : \n"+'</b>'+data3.getOrderHistoryData[0].Shipping;
        chatbot.postReply(reply,2000)
      }

      if(data3.getOrderHistoryData[0].orderStatus=="canceled"||data3.getOrderHistoryData[0].orderStatus=="Cancelled")
      {
        reply="Ohh, you canceled your last order!";
        chatbot.postReply(reply,2000);
      }
      for(j=0;j<data3.getOrderHistoryData.length;j++)
      {
        if(data3.getOrderHistoryData[j].orderStatus=="Pending"|| data3.getOrderHistoryData[j].orderStatus=="Transit"||data3.getOrderHistoryData[j].orderStatus=="paid"|| data3.getOrderHistoryData[j].orderStatus=="Packed")
        {
          reply= '<b>'+"Order Placed On:  " +'</b>'+data3.getOrderHistoryData[j].orderDate+'<br/>'+'<b>'+"Order Status : "+'</b>'+data3.getOrderHistoryData[j].orderStatus+"."+'<br/>';
          chatbot.postReply(reply,2000);
          chatbot.put_dia1("Click Here to track your Order ","https://www.flavorsofmycity.com/order-track?trk_no=".concat(data3.getOrderHistoryData[0].orderId).concat("&tel_num=").concat(data3.getOrderHistoryData[0].contact),2000);
        }
        if(data3.getOrderHistoryData[j].orderStatus=="pending_payment")
        {
          reply= '<b>'+"Order Placed On:  " +'</b>'+data3.getOrderHistoryData[j].orderDate+'<br/>'+'<b>'+"Order Status : "+'</b>'+data3.getOrderHistoryData[j].orderStatus+"."+'<br/>';
          chatbot.postReply(reply,2000);
          reply="You haven't made the payment after adding items to the cart...!\n Please make the payment!";
          chatbot.postReply(reply,2000);
        }
      }//End of For
    }
      today = new Date();
      sDate = new Date(data3.getOrderHistoryData[0].orderDate);
      var min = 1000*60; //------milliseconds*seconds------
      var hrs = min*60;
      var days = hrs*24;
      var year_s = days*365;
      var mday_s = Math.round(Math.abs((today.getTime() - sDate.getTime())/(days)));
      if(mday_s > 30)  //------Greater than 30 Days------
      {
        reply="Its been long since you made an order!!!";
        chatbot.postReply(reply,2000);
      }
      else
      {
        var reply= "Check connection";
        chatbot.postReply(reply, 2000);
        console.log('error');
      }
  }
  request.send();
},
//-----------------------------------------------------------------------------------------------------------
*/