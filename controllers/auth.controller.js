export const getRegisterPage=(req,res)=>{
     return res.render('../views/auth/register' , {isLoginPage:true}) ;

}

 export const getLoginPage=( req ,res)=>{
     return res.render('../views/auth/login', {isLoginPage:true})
}
export const postLogin=( req ,res)=>{
res.setHeader('Set-Cookie', 'isLoggedIn=true; Path=/; HttpOnly; Secure;');

     res.redirect('/')

}