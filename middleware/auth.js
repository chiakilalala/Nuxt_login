export default function(context) {
    if (process.server) { //這是後端
        if (!context.req.headers.cookie) return context.redirect("/"); //如沒抓到就回到首頁
        if (context.req.headers.cookie.indexOf("id_token=") == -1) return context.redirect("/") //如沒抓到cookie 
        return
    }
    if (!context.store.state.isUserLoggedIn) {
        context.redirect("/")
    }
}