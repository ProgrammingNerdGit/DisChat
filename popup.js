const joinButton = document.getElementById("JoinButton");
const headerLen = 64;

function joined(){
    var input = document.getElementById("IP");

    document.getElementById("IpInfo").innerText = ("Current Server IP: "+input.value)
    
}
joinButton.addEventListener('click',joined);
fetch('http://localhost:8080/?GET').then(r => r.text()).then(result => {
    console.log(result)
})
