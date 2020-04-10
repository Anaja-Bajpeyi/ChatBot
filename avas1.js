function setup() {
  chatbot.loadFiles(['brai3.rive']);
}
window.onload = setup;

function searchresult(args1="",args2="",args3="",args4="")
{
  var args=args1.concat(" ").concat(args2).concat(" ").concat(args3).concat(" ").concat(args4);
  var request = new XMLHttpRequest();
  var apiaddress='http://13.228.141.24/mobile_api/V1_newandroid_2/getSearchResult.php?searchKeyword='.concat(args);
  request.open('GET', apiaddress, true);
  request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  var reply="";
  if (request.status >= 200 && request.status < 400) {
    switch(data.getProductsData.length)
    {
      case 0 :
      {  put_dia_link(args,1000);
         setTimeout(function(){
         chatbot.getReply("option");
        }, 1400);
      }break;
      case 1 : {
      if(data.getProductsData[0].availability=="IN-STOCK")
      {
          reply="Great! "+data.getProductsData[0].productName+ '<b>'+" is in stock."+' </b>'+'<br/>'+'<img src="'+data.getProductsData[0].productImage+'" /><br/>'+ '<b>'+"Product Discription:"+' </b>'+data.getProductsData[0].productDetail+'<br/>'+ '<b>'+"Weight :"+ '</b>'+data.getProductsData[0].weightAvailablity[0].weight+'<br/>'+'<b>'+"Price :"+'</b>'+" Rs."+parseInt(data.getProductsData[0].price);
          chatbot.postReply(reply,2000);
          //put_dia("Please click here to view the product.","https://www.flavorsofmycity.com/catalogsearch/result/?q=".concat(args),2200);
          if(data.getProductsData[0].newlabel=="Yes")
          {
            reply="Hey "+data.getProductsData[0].productName.concat(" is also our speciality");
            chatbot.postReply(reply,2000);
          }
          setTimeout(function(){
          chatbot.getReply("option");
          }, 2200);
      }
      else if(data.getProductsData[0].availability=="OUT-OF-STOCK")
      {
          reply= "Ohh So Sorry! '"+data.getProductsData[0].productName.concat("' is out of stock. Do check others...!")+'<br/>'+'<img src="'+data.getProductsData[0].productImage+'" />'+'<br/>'+ "Product Discription:".concat("\n\n"+data.getProductsData[0].productDetail)+ '<b>'+"Weight :"+ '</b>'+data.getProductsData[0].weightAvailablity[0].weight+'<br/>'+'<b>'+"Price :"+'</b>'+" Rs."+parseInt(data.getProductsData[0].price);
          chatbot.postReply(reply,2000);
          setTimeout(function(){
          chatbot.getReply("option");
          }, 2200);
      }
  }break;
  default :
    {
      reply="I have found ".concat(data.getProductsData.length).concat(" items with the product name related to ' ".concat(args)).concat("'");
      put_dia("Please click here to view the products.","https://www.flavorsofmycity.com/catalogsearch/result/?q=".concat(args),2200);
      chatbot.postReply(reply,2000);
      setTimeout(function(){
      chatbot.getReply("option");
      }, 2200);
      /*for(i=1;i<=data.getProductsData.length;i++)
      {
        reply= '<img src="'+data.getProductsData[i].productImage+'" />'+data.getProductsData[i].productName+"\v";
        chatbot.postReply(reply,2000);
      }*/
    }
  }
  } else {
    var reply= "Sorry, could not find any product related to ".concat(args);
    chatbot.postReply(reply, 2200);
    console.log('error');
  }
}
request.send();
}
//------------------------------------------------------------------------------------------------------

function weight(args1="",args2="",args3="",args4="")
{
  var args=args1.concat(" ").concat(args2).concat(" ").concat(args3).concat(" ").concat(args4);
  var request = new XMLHttpRequest();
  var apiaddress='http://13.228.141.24/mobile_api/V1_newandroid_2/getSearchResult.php?searchKeyword='.concat(args);
  request.open('GET', apiaddress, true);
  request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  var reply="";
  if (request.status >= 200 && request.status < 400) {
    switch(data.getProductsData.length){
        case 0 :
        {  put_dia_link(args,1000);
            setTimeout(function(){
              chatbot.getReply("option");
            }, 1400);
        }break;
        case 1 : {
        if(data.getProductsData[0].availability=="IN-STOCK")
        {
            reply='<img src="'+data.getProductsData[0].productImage+'" /><br/>'+ '<b>'+"Weight :"+ '</b>'+data.getProductsData[0].weightAvailablity[0].weight;
            chatbot.postReply(reply,2000);
            setTimeout(function(){
            chatbot.getReply("option");
            }, 2200);
        }
        else if(data.getProductsData[0].availability=="OUT-OF-STOCK")
        {
            reply= '<img src="'+data.getProductsData[0].productImage+'" /><br/>'+'<b>'+"Weight :"+ '</b>'+data.getProductsData[0].weightAvailablity[0].weight;
            chatbot.postReply(reply,2000);
            setTimeout(function(){
            chatbot.getReply("option");
            }, 2200);
        }
      }break;
      default :
     {
          reply="I have found ".concat(data.getProductsData.length).concat(" items with the product name related to ' ".concat(args)).concat("'");
          put_dia("Please click here to view the product.","https://www.flavorsofmycity.com/catalogsearch/result/?q=".concat(args),2200);
          chatbot.postReply(reply,2000);
          setTimeout(function(){
            chatbot.getReply("option");
          }, 2200);
      }
    }//End of switch-case
  } else {
    var reply= "Sorry, could not find any product related to ".concat(args);
    chatbot.postReply(reply, 2200);
    console.log('error');
  }
}
request.send();
}

//------------------------------------------------------------------------------------------------------

function put_dia_link(str1,delay)
{
  var rand = Math.round(Math.random() * 10000);
  setTimeout(function() {
    $("#dialogue").append(
      "<div class='bot-row' id='" +
        rand+
        "'><span class='bot'>" +
        "Sorry, could not fine any product related to ' "+str1+"'. For further information You can visit our "+"website ".link("https://www.flavorsofmycity.com")
        +"or download our "+ "app".link("https://www.flavorsofmycity.com/flavors-app-offer") + " in your mobile."+
        "</span></div>"
    );
    if (typeof pop !== "undefined") pop.play();
    if (typeof onChatbotReply === "function") onChatbotReply();
    $("#" + rand)
      .hide()
      .fadeIn(200);
  }, delay);
}
//--------------------------------------------------------------------------------------

function put_dia(str,url,delay)
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
}
//----------------------------------------------------------------------------------------------------
function check2()
  {
    var x= document.getElementById("code1").value;
    data = '[{"name":"abc",  "email":"a@b.com", "phone":9876543210},{"name":"qrs", "email":"q@r.com", "phone":9999999999}]';
    var mydata = JSON.parse(data);
    //var x=Math.floor((Math.random() * 100) + 1);
      if("flavours"==x)
      {
          reply= "Ah, " +mydata[0].name+" Welcome Back..!"+" Hope the last experience was great!";
          chatbot.postReply(reply,2000);
          setTimeout(function(){
          chatbot.getReply("op2");
          }, 2200);
      }
      else if("taste"==x)
      {
        reply= "Ah, " +mydata[1].name+" Welcome Back..!\n"+" Hope the last experience was great!";
        chatbot.postReply(reply,2000);
        setTimeout(function(){
        chatbot.getReply("op2");
        }, 2200);
      }
      else
      {
        reply= "Verification fails you are not the user!";
        chatbot.postReply(reply,2000);
        setTimeout(function(){
          chatbot.getReply("op3");
          }, 2200);
      }
  }
//----------------------------------------------------------------------------------------------------
/*
var argss1=function()
{
  reply= "Short Description:\n"+data.getProductsData[0].productShortDescription;
  chatbot.postReply(reply, 2000);
} ;
//------------------------------------------------------------------------------------------------------
function check2()
  {
    var x= document.getElementById("code1").value;
    data = '[{"name":"abc",  "email":"a@b.com", "phone":9876543210},{"name":"qrs", "email":"q@r.com", "phone":9999999999}]';
    var mydata = JSON.parse(data);
    //var x=Math.floor((Math.random() * 100) + 1);
      if("flavours"==x)
      {
          reply= "Ah, " +mydata[0].name+" Welcome Back..!"+" Hope the last experience was great!";
          chatbot.postReply(reply,2000);
          setTimeout(function(){
          chatbot.getReply("op2");
          }, 2200);
      }
      else if("taste"==x)
      {
        reply= "Ah, " +mydata[1].name+" Welcome Back..!\n"+" Hope the last experience was great!";
        chatbot.postReply(reply,2000);
        setTimeout(function(){
        chatbot.getReply("op2");
        }, 2200);
      }
      else
      {
        reply= "Verification fails you are not the user!";
        chatbot.postReply(reply,2000);
        setTimeout(function(){
          chatbot.getReply("op3");
          }, 2200);
      }
  }
  COMMENTS:
  +'<br/>'+'<button class="btnn" >'+'<i class="'+'fa fa-thumbs-o-up icon-white'+'">'+'</i>'+' Like'+'</button>'
//------------------------------------------------------------------------------------------------------
*/