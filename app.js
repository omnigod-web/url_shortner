
import express from "express"
import { shortenerRoutes }  from "./routes/shortner.routes.js";
import { authRoutes } from "./routes/auth.routes.js";

const app=express();



const PORT =  3000;


app.use(express.static("public")); 
app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs") // by default it searches into  views folder it is folder which is to be served
// app.set("views" , "./views") //from where to views and relative path

//express router
app.use(authRoutes)
app.use(shortenerRoutes)

//..........................................NODE SERVER....................................................................
// const server = createServer(async (req, res) => {
//     console.log(req.url);

//     if (req.method === 'GET') {
//         if (req.url === "/") {
//             return serveFile(res, path.join('public', 'index.html'), 'text/html');
//         } else if (req.url === "/index.css") {
//             return serveFile(res, path.join('public', 'index.css'), 'text/css');
//          } 
//         else if(req.url==="/links"){
//              const links =await loadLinks();
//              res.writeHead(200, { 'Content-Type': 'application/json' });
//              return res.end(JSON.stringify(links))

//         }
        
//         else {
//             const links= await loadLinks();
//             const shortCode=req.url.slice(1);
//             console.log("links red." , req.url);
//             if(links[shortCode]){
//                 res.writeHead(302 ,{location: links[shortCode] })
//                 return res.end();
//             }
//             res.writeHead(404 , {"Content-Type": 'text/plain'})
//             return res.end("shortened url is not found")
//         }
//     }

//     // if(req.method=='POST' && req.url ==='/shorten'){
//     //     const links =await loadLinks();
//     //     let body=''
//     //  req.on('data' , (chunk)=>(
//     //     body+=chunk
//     //  ))
//     //  req.on('end', async ()=>{
//     //     const{url , shortCode }=JSON.parse(body)
//     //     if(!url){
//     //         res.writeHead(400,{"Content-Type": 'text/plain'})
//     //         return res.end("URL is req")
//     //     }

//     //     const finalShortCode =shortCode || crypto.randomBytes(4).toString('hex')

//     //     if(links[finalShortCode]){
//     //         res.writeHead(400 ,{'Content-Type':"text/plain"});
//     //         return res.end('shortcode exsits.chose another to continue')
//     //     }
        
//     //     links[finalShortCode]=url

//     //     await saveLinks(links)
        
//     //      res.writeHead(200 ,{'Content-Type':"application/json"});
//     //      res.end(JSON.stringify({success:true , shortCode:finalShortCode}))
//     //  })
//     // }
// });
//.........................................................................................................................
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
