const joinButton = document.getElementById("JoinButton");
const chatBox = document.getElementById("chatbox<p>");
const SendButton = document.getElementById("send");
const chatInput = document.getElementById("chatbox");
const chatNum = document.getElementById("chatNum");

chatBox.innerHTML = "<h1><b>NOT CONNECTED</b></h1>";


function stripHtml(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.innerText;
}

var IP = ""
var input = document.getElementById("IP");
function joined(){
    document.getElementById("Join").style.display = "none";
    if(chatNum.value > 9){
        chatNum.value = 9;
    }
    console.log(input.value)

    chrome.storage.sync.set({"resentServerIP":input.value})

    document.getElementById("IpInfo").innerText = ("Current Server IP: "+ input.value+", "+chatNum.value)

    var worker = new Worker('clientGet.js');
    worker.addEventListener('message', function(e) {
        if(chatBox.innerHTML != e.data){chatBox.innerHTML= "<h2>"+decodeURI(e.data)+"</h2>";}
        
        console.log(e.data);
    })
    ip = input.value;
    worker.postMessage([input.value,chatNum.value])
    
}



function send(){
    console.log(ip);
    var worker2 = new Worker('clientSend.js');
    worker2.postMessage([$("<p>"+chatInput.value+"</p>").text(),ip,chatNum.value]);
    
}

$(document).keypress(function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      send()
    }
});

joinButton.addEventListener('click',joined);
SendButton.addEventListener('click',send);



chrome.storage.sync.get("resentServerIP",function (data) {
    var prevData = "";
    prevData = data["resentServerIP"];

    console.log(prevData)

    input.value =  prevData
    
})
