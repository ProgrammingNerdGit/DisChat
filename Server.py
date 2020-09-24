from http.server import HTTPServer, BaseHTTPRequestHandler

serverData = ""
class Serv(BaseHTTPRequestHandler):

    def do_GET(self):
        global serverData
        if self.path[5] == '/?GET':
            data = serverData
            self.send_response(200)
        elif self.path[0:6] == '/?SEND':
            serverData += self.path.split("$")[1]+"<br>"
            self.send_response(200)
        else:
            data = "404"
            self.send_response(200)

        self.end_headers()
        self.wfile.write(bytes(data, 'utf-8'))


httpd = HTTPServer(('localhost', 8080), Serv)
httpd.serve_forever()