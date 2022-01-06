// wwdw.js

//import { fetchData, fetchSession } from './wwdw-data.js';


function navs( crumbs=[] ){

    crumbs.unshift( {nav: "Home", href:"#/" }  )

    const nav = document.getElementsByTagName("nav")[0]
    nav.innerHTML = ""

    for ( const [i, c] of crumbs.entries()) {

        const anchor = document.createElement("a")
        anchor.innerHTML = c.nav
        anchor.setAttribute("href", c.href)
        nav.append(anchor)

        if (i < crumbs.length-1) {
            const caret = document.createElement("span")
            caret.innerHTML = ">"
            nav.append(caret)
        }
    }

}

async function onhashchange(){

    const documenthash = (window.location.hash.split("/").length) ? window.location.hash.split("/")[1] : null

    console.log("hashchange", documenthash)

    if (documenthash) {
        const crumb = await articleuservoornemensmake( documenthash )
        // crum...
        navs([{nav: "poeh", href: "#/poeh"}])
    }
    else  {
        await articleusernamesls()
        navs()
    }

}

window.addEventListener("hashchange", onhashchange, false);

async function fetchSession(){
    
    console.log("fetchSession")
}

document.getElementById("userlogin").addEventListener("click", login)


// async function articleonchange(){
//     // const uservoornemensform = articleuservoornemensread()
//     // console.log("uservoornemensform", uservoornemensform)
// }
// document.querySelectorAll("article>*").addEventListener("change", articleonchange)


function btndelclick(e){
    // confirm?!
    e.target.parentNode.parentNode.remove()
}

function btndel() {
    const btndel = document.createElement("button")
    btndel.innerHTML = 'verwijder'
    btndel.addEventListener("click", btndelclick )
    return btndel
}

function mkvoornemen(vns, i, article) {

    const v = vns.shift()

    const divvoornemen = document.createElement("div")

    const hdrvoornemen = document.createElement("div")
    const btnvoornemennewstep = document.createElement("button")
    const btnvoornemennewthought = document.createElement("button")
    
    btnvoornemennewstep.innerHTML = 'nieuwe step'
    btnvoornemennewthought.innerHTML = 'nieuwe thought'

    hdrvoornemen.innerHTML = ("00"+i).slice(-2)
    hdrvoornemen.innerHTML += " -- "
    hdrvoornemen.innerHTML += v.text

    hdrvoornemen.append( btndel() )
    hdrvoornemen.append( btnvoornemennewstep )
    hdrvoornemen.append( btnvoornemennewthought )

    divvoornemen.append( hdrvoornemen )
    article.append( divvoornemen)

    function divsnt(snt, iv, id) {

        const divsnts =document.createElement("div")
        divsnts.id = id + ("00"+iv).slice(-2)

        for ( const s of snt ) {

            const divsnt =document.createElement("div")

            divsnt.innerHTML = id + " " + s.text

            divsnt.append( btndel() )

            divsnts.append(divsnt)
        }

        return divsnts
    }

    divvoornemen.append( divsnt( v.step, i, "step" ) )

    divvoornemen.append( divsnt( v.thought, i, "thought" ) )


    return vns

}

async function articleusernamesls(){

    const users = await fetchData()

    const article = document.querySelector("article")
    article.innerHTML = ""

    const divusers = document.createElement("div")
    article.append( divusers )

    console.log("users", users)

    for ( const u of users ) {

        const divuser = document.createElement("a")

        divuser.innerHTML = u.username
        
        divuser.setAttribute("href","#/"+u.wwdwid)
        divusers.append(divuser)
    }


}


// article - make
async function articleuservoornemensmake(){

    const voornemens = await fetchData()

    voornemens.voornemen.push( voornemens.voornemen[0] )

    // article - user - header
    const article = document.querySelector("article")
    article.innerHTML = ""

    const divuser = document.createElement("div")

    const btnvoornemennew = document.createElement("button")
    btnvoornemennew.innerHTML = "nieuw voornemen"

    divuser.innerHTML = voornemens.username

    divuser.append( btndel() )
    divuser.append(btnvoornemennew)

    article.append( divuser)

    // article - voornemens - content
    let vns = Object.assign ([], voornemens.voornemen )
    while ( vns.length) {
        const i = voornemens.voornemen.length - vns.length
        vns = mkvoornemen( vns, i, article )
    }

    // const uservoornemensform = articleuservoornemensread()
    // console.log("uservoornemensform", uservoornemensform)

}

// article - read
function articleuservoornemensread(){

    const article = document.querySelector("article")

    console.log("article.innerHTML", article.innerHTML)

    const vnms = Object.assign([], document.querySelectorAll("article>div") )

    // div[0] = {username, userid}
    // div[1..n] = {voornemen, [steps], [thoughts]}
    const form = vnms.reduce((a,v,i)=>{

        a[i] = v

        return a

    },{})

    return form
}

onhashchange() // start


