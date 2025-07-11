import crypto from "crypto"
import { loadLinks, saveLinks } from "../models/shortner.model.js";



export const getShortnerPage = async (req, res) => {
    try {
        // const file =await readFile(path.join("views" ,"index.html"))
        const links = await loadLinks();
        let isLoggedIn =req.headers.cookie

        isLoggedIn = Boolean(
            isLoggedIn?.split(';')
            ?.find((cookie)=>cookie.trim().startsWith("isLoggedIn"))
            ?.split("=")[1]
        )
        console.log("cookies" , isLoggedIn);
        

        return res.render('index', { links, host: req.host, isLoggedIn})

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }
}

export const postURLShortner = async (req, res) => {
    try {
        const { url, shortCode } = req.body; //body carry every data from front end like form data in our case basesd on label  

        const finalShortCode = shortCode || crypto.randomBytes(4).toString('hex')
        const links = await loadLinks()


        if (links[finalShortCode]) {
            return res.status(400).send('shortcode exsits.choose another to continue')
        }

        links[finalShortCode] = url

        await saveLinks(links)

        return res.redirect('/')

    } catch (error) {
        console.log(error);
        return res.status(500).send("internal server error")

    }
}

export const loginPageHeader = async (req, res) => {
    try {
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks()
        if (!links[shortCode]) return res.status(404).send("404 error occured");

        return res.redirect(links[shortCode]);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Iternall isseue")

    }
}