const http = require('http')

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200
        res.end()
    }
    res.statusCode = 404
    res.end()
})

server.listen(3001, () => {
    console.log('server on http://localhost:3001')
})