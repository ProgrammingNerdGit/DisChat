const joinButton = document.getElementById("JoinButton");

function joined(){
    var JoinDiv = document.getElementById("Join");
    var ChatDiv = document.getElementById("Chatroom");
    var input = document.getElementById("IP");
    JoinDiv.style.display = "none";
    ChatDiv.style.display = "block";

    document.getElementById("IpInfo").innerText = ("Current Server IP: "+input.value)
}

joinButton.addEventListener("click",joined);