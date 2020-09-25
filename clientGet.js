self.addEventListener('message', function(e) {
    while(true){
        try {
            xmlhttp=new XMLHttpRequest();
            xmlhttp.open("GET", ("http://%s/?GET"+e.data[1]).replace("%s",e.data[0]), false);

            xmlhttp.send();
            self.postMessage(xmlhttp.responseText)
        } catch (error) {
            console.log(error);
        }
        

        
    }
})