from http.server import HTTPServer, BaseHTTPRequestHandler
import datetime

serverData = [[],[],[],[],[],[],[],[],[],[],[]]
class Serv(BaseHTTPRequestHandler):

    def do_GET(self):
        global data
        global serverData
        if self.path == "/":
            data = "yello"
            self.send_response(200)
        elif self.path[0:5] == '/?GET':
            print(self.path)
            data = '\n'.join(serverData[int(self.path[5])])
            self.send_response(200)
        elif self.path[0:6] == '/?SEND':
            now = datetime.datetime.now()
            serverData[int(self.path[6])].append(f"{now.hour}:{now.minute}: {str(self.path.split('$')[1])}")
            self.send_response(200)
        else:
            data = "404"
            self.send_response(200)

        self.end_headers()
        self.wfile.write(bytes(data, 'utf-8'))


httpd = HTTPServer(('', 8000), Serv) # ------change port and ip to prefured settings-------
print(httpd.server_address)
httpd.serve_forever()
