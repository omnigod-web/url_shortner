import { createServer } from 'http';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const PORT =  3000;
const DATA_FILE =path.join('data','links.json')

const serveFile = async (res, filePath, contentType) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': contentType});
        res.end("404 Page Not Found");
    }
};

const loadLinks =async ()=>{
    try {
        const data =await readFile(DATA_FILE ,'utf-8')
        return JSON.parse(data)
    } catch (error) {
        if(error.code=="ENOENT"){
            await writeFile(DATA_FILE ,JSON.stringify({}))
            return{}
        }
        throw error;
    }
}

const saveLinks = async (links) =>{
    await writeFile(DATA_FILE , JSON.stringify(links))
}

const server = createServer(async (req, res) => {
    console.log(req.url);

    if (req.method === 'GET') {
        if (req.url === "/") {
            return serveFile(res, path.join('public', 'index.html'), 'text/html');
        } else if (req.url === "/index.css") {
            return serveFile(res, path.join('public', 'index.css'), 'text/css');
         } 
        else if(req.url==="/links"){
             const links =await loadLinks();
             res.writeHead(200, { 'Content-Type': 'application/json' });
             return res.end(JSON.stringify(links))

        }
        
        else {
            const links= await loadLinks();
            const shortCode=req.url.slice(1);
            console.log("links red." , req.url);
            if(links[shortCode]){
                res.writeHead(302 ,{location: links[shortCode] })
                return res.end();
            }
            res.writeHead(404 , {"Content-Type": 'text/plain'})
            return res.end("shortened url is not found")
        }
    }

    if(req.method=='POST' && req.url ==='/shorten'){
        const links =await loadLinks();
        let body=''
     req.on('data' , (chunk)=>(
        body+=chunk
     ))
     req.on('end', async ()=>{
        const{url , shortCode }=JSON.parse(body)
        if(!url){
            res.writeHead(400,{"Content-Type": 'text/plain'})
            return res.end("URL is req")
        }

        const finalShortCode =shortCode || crypto.randomBytes(4).toString('hex')

        if(links[finalShortCode]){
            res.writeHead(400 ,{'Content-Type':"text/plain"});
            return res.end('shortcode exsits.chose another to continue')
        }
        
        links[finalShortCode]=url

        await saveLinks(links)
        
         res.writeHead(200 ,{'Content-Type':"application/json"});
         res.end(JSON.stringify({success:true , shortCode:finalShortCode}))
     })
    }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
});
