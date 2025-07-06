import { readFile, writeFile  } from 'fs/promises';
// import crypto from 'crypto';
import path from 'path';
import { json } from 'stream/consumers';


const DATA_FILE =path.join('data','links.json')

 export const loadLinks =async ()=>{  
    try {
        const data =await readFile(DATA_FILE ,'utf-8')
        const parseddata=JSON.parse(data)
        console.log( `${JSON.stringify(parseddata)}data ,this is the content`);
        return JSON.parse(data)
    } catch (error) {
        if(error.code=="ENOENT"){
            await writeFile(DATA_FILE ,JSON.stringify({}))
            return{}
        }
        throw error;
    }
}

 export const saveLinks = async (links) =>{  //fuction to save links And shortchode to the file
    await writeFile(DATA_FILE , JSON.stringify(links))
}