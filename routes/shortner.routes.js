
import { Router } from 'express';
import { postURLShortner ,getShortnerPage , redirectToShortLink } from '../controller/postShortner.js';


const router=Router()



router.get("/", getShortnerPage )

router.post('/', postURLShortner)


router.get("/:shortCode" , redirectToShortLink)
// export default  router

//named export
 export const shortenerRoutes =router;