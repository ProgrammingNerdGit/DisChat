self.addEventListener('message', function(e) {
    try {
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET", ("http://%s/?SEND"+e.data[2]+"$"+e.data[0]).replace("%s",e.data[1]), false);
        xmlhttp.send();
    } catch (error) {console.log(error);}
        
})