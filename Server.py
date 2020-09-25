from http.server import HTTPServer, BaseHTTPRequestHandler

serverData = [[],[],[],[],[],[],[],[],[],[],[]]
class Serv(BaseHTTPRequestHandler):

    def do_GET(self):
        global data
        global serverData
        if self.path[0:5] == '/?GET':
            print(self.path)
            data = '<br>'.join(serverData[int(self.path[5])])
            self.send_response(200)
        elif self.path[0:6] == '/?SEND':
            serverData[int(self.path[6])].append(self.path.split("$")[1])
            if(len(serverData[int(self.path[6])]) > 17):
                serverData[int(self.path[6])].remove(serverData[int(self.path[6])][0])
            self.send_response(200)
        else:
            data = "404"
            self.send_response(200)

        self.end_headers()
        self.wfile.write(bytes(data, 'utf-8'))


httpd = HTTPServer(('localhost', 8080), Serv) # ------change port and ip to prefured settings-------
httpd.serve_forever()