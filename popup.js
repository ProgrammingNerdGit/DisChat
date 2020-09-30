const joinButton = document.getElementById("JoinButton");
const chatBox = document.getElementById("chatbox<p>");
const SendButton = document.getElementById("send");
const chatInput = document.getElementById("chatbox");
const chatNum = document.getElementById("chatNum");

chatBox.innerHTML = "NOT CONNECTED";

var IP = ""
var input = document.getElementById("IP");

var allowSend = true;
function joined(){

    if(input.value == "public"){
        input.value = "35.227.64.163:8000"
    }

    document.getElementById("Join").style.display = "none";
    if(chatNum.value > 9){
        chatNum.value = 9;
    }
    console.log(input.value)

    chrome.storage.sync.set({"resentServerIP":input.value})

    document.getElementById("IpInfo").innerText = ("Current Server IP: "+ input.value+", "+chatNum.value)

    var worker = new Worker('clientGet.js');
    worker.addEventListener('message', function(e) {
        if(chatBox.innerHTML != e.data){chatBox.innerHTML= decodeURI(e.data);chatBox.scrollTop = chatBox.scrollHeight;}
        
        console.log(e.data);
    })
    ip = input.value;
    worker.postMessage([input.value,chatNum.value])
    
}



function send(){
    if(allowSend){
        console.log(ip);
        var worker2 = new Worker('clientSend.js');
        worker2.postMessage([(chatInput.value).replace('%',''),ip,chatNum.value]);
        allowSend = false
        setTimeout(function() {
            allowSend = true;
          }, 750)
    }
    
    
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

    if(prevData != undefined){
        input.value =  prevData
    }
    else{
        input.value = "Input IP"
    }
    
    
})
