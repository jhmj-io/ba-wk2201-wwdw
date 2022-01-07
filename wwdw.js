// wwdw.js

import { fetchData, fetchSession, fetchSessionClear, fetchSessionLoad } from './wwdw-data.js';

const namenl = {"step":"stap", "thought":"gedachte"}

// article - read - helpers

function btndelclick(e){
    // confirm?!
    e.target.parentNode.parentNode.remove()
}

function btnsubmit(){
    document.getElementById("btnsubmit").classList.add("changestosubmit")
}

function btndel() {
    const btndel = document.createElement("button")
    btndel.innerHTML = 'verwijder'
    btndel.addEventListener("click", btndelclick )
    return btndel
}

function btninsertvoornemen(e) {
    console.log("btninsertvoornemen", e.target)
    // 
}

function btninsertstep(e) {
    console.log("btninsertstep", e.target)
}

function btninsertthought(e) {
    console.log("btninsertthought", e.target)
}

function mkvoornemen(vns, i, article, change) {

    const v = vns.shift()

    const divvoornemen = document.createElement("div")

    const hdrvoornemen = document.createElement("div")

    const label = document.createElement("label")
    label.innerHTML = "voornemen " + (i+1)
    hdrvoornemen.append(label)

    hdrvoornemen.setAttribute("name", "voornemen")

    if (change) {
        const hdrvoornemeninput = document.createElement("input")
        hdrvoornemeninput.value = v.text
        hdrvoornemeninput.addEventListener("change", btnsubmit)
        hdrvoornemen.append(hdrvoornemeninput ) 
    }
    else {
        const hdrvoornemeninput = document.createElement("div")
        hdrvoornemeninput.innerHTML = v.text
        hdrvoornemen.append(hdrvoornemeninput ) 
    }
 
    if (change) {
        const btnvoornemennewstep = document.createElement("button")
        const btnvoornemennewthought = document.createElement("button")
        
        btnvoornemennewstep.innerHTML = 'nieuwe stap'
        btnvoornemennewstep.setAttribute("disabled", true)
        btnvoornemennewstep.addEventListener("click",btninsertstep )

        btnvoornemennewthought.innerHTML = 'nieuwe gedachte'
        btnvoornemennewthought.setAttribute("disabled", true)

        btnvoornemennewthought.addEventListener("click",btninsertthought )

        hdrvoornemen.append( btndel() )
        hdrvoornemen.append( btnvoornemennewstep )
        hdrvoornemen.append( btnvoornemennewthought )

    }

    divvoornemen.append( hdrvoornemen )
    article.append( divvoornemen)

    function divsnt(snt, name) {

        const divsnts = document.createElement("div")

        for ( const [j, s] of snt.entries() ) {

            const divsnt = document.createElement("div")
            const label = document.createElement("label")
            label.innerHTML = namenl[name] + " " + (j +1)
            divsnt.append(label)

            const divsnttxt = document.createElement("div")
            divsnttxt.innerHTML = s.text
            divsnttxt.setAttribute("name", name)
            divsnt.append(divsnttxt)

            if (change) {
                divsnttxt.setAttribute( "contenteditable", true )
                divsnttxt.addEventListener("keyup", btnsubmit)
                divsnt.append( btndel() ) 
            }
            divsnts.append(divsnt)

        }

        return divsnts
    }

    divvoornemen.append( divsnt( v.step, "step" ) )

    divvoornemen.append( divsnt( v.thought, "thought" ) )

    return vns
}


// article - read

async function articleuservoornemensread(){

    const voornemens = await fetchData()

    //voornemens.voornemen.push( voornemens.voornemen[0] )

    // article - user - header
    const article = document.querySelector("article")
    article.innerHTML = ""

    const voornemensloggedin =  window.loginwwdwid.innerHTML && voornemens["wwdwid"] === window.loginwwdwid.innerHTML
    const change = voornemensloggedin && window.location.hash.split("/")[2]

    const divuser = document.createElement("div")
    const label = document.createElement("label")
    label.innerHTML = "naam"
    divuser.append(label)

    if (voornemensloggedin) {

        if (change) {

            const divuserinput = document.createElement("input")
            divuserinput.value = voornemens.username 
            divuserinput.id = "inputusername"
            divuserinput.addEventListener("change", btnsubmit)
            divuser.append(divuserinput ) 

            const btnvoornemennew = document.createElement("button")
            btnvoornemennew.innerHTML = "nieuw voornemen"
            btnvoornemennew.setAttribute("disabled", true)
            btnvoornemennew.addEventListener("click",btninsertvoornemen )

            divuser.append( btndel() )
            divuser.append(btnvoornemennew)
        }
        else {
            const divuserinput = document.createElement("div")
            divuserinput.innerHTML = voornemens.username || voornemens.wwdwid
            divuser.append(divuserinput ) 


            const anchorchange = document.createElement("a")
            anchorchange.setAttribute("href","#/"+voornemens["wwdwid"]+"/change")

            const btnvoornemenchange = document.createElement("button")
            btnvoornemenchange.innerHTML = "wijzigen"

            anchorchange.append(btnvoornemenchange)
            divuser.append(anchorchange)
        }
    }
    else {
        const divuserinput = document.createElement("div")
        divuserinput.innerHTML = voornemens.username || voornemens.wwdwid
        divuser.append(divuserinput ) 

    }
    article.append( divuser)

    // article - voornemens - content
    let vns = Object.assign ([], voornemens.voornemen )
    while ( vns.length) {
        const i = voornemens.voornemen.length - vns.length
        vns = mkvoornemen( vns, i, article, change )
    }


    if (change) {
        const divsubmit = document.createElement("div")
        divsubmit.id="divsubmit"
        const anchornochange = document.createElement("a")
        anchornochange.setAttribute("href","#/"+voornemens["wwdwid"])

        const btnvoornemennochange = document.createElement("button")
        btnvoornemennochange.innerHTML = "Sluit"
        anchornochange.append(btnvoornemennochange)
        divsubmit.append(anchornochange)

        const btnvoornemensubmit = document.createElement("button")
        btnvoornemensubmit.innerHTML = "Opslaan"
        btnvoornemensubmit.id="btnsubmit"
        btnvoornemensubmit.addEventListener("click", articleuservoornemenswrite )
        divsubmit.append(btnvoornemensubmit)
        article.append( divsubmit )
    }


    return voornemens
}

// article - write

async function articleuservoornemenswrite(){

    const article = {}

    const username = document.getElementById("inputusername")
    article["username"] = (username) ? username.value : ""
 
    const vnms = Object.assign([], document.getElementsByName("voornemen"))
    article["voornemen"] = vnms.reduce((a,v,i)=>{

        const voornemen = {}

        const text = v.querySelector("input")
        voornemen["text"] = (text) ? text.value : ""

        const steps = Object.assign([], v.parentNode.querySelectorAll("div[name=step]") )
        voornemen["step"] = steps.reduce((sa,s)=>{
            sa.push({text: s.innerHTML})
            return sa
        },[])

        const thoughts = Object.assign([], v.parentNode.querySelectorAll("div[name=thought]") )
        voornemen["thought"] = thoughts.reduce((sa,s)=>{
            sa.push({text: s.innerHTML})
            return sa
        },[])

        a.push(voornemen)

        return a

    },[])

    //console.log("articlewrite")
    //console.log(article)

    document.getElementById("btnsubmit").className = ""

    await fetchData( undefined , article ) // write

}



// article - ls
async function articleusernamesls(){

    // users
    const users = await fetchData()
    //console.log("users", users)

    const article = document.querySelector("article")
    article.innerHTML = ""

    const divusers = document.createElement("div")
    article.append( divusers )

    for ( const u of users ) {

        const divuser = document.createElement("a")

        divuser.innerHTML = u.username || u.wwdwid 
        
        divuser.setAttribute("href","#/"+u.wwdwid)
        divusers.append(divuser)
    }

}


// navigating

function navs( crumbs=[] ){

    crumbs.unshift( {nav: "Home", href:"#/" }  )

    const nav = document.getElementsByTagName("nav")[0]
    nav.innerHTML = ""

    if (window.location.hash.split("/")[2])
        crumbs.push( {nav: window.location.hash.split("/")[2], href: window.location.hash }  )

    for ( const [i, c] of crumbs.entries()) {

        const anchor = document.createElement("a")
        anchor.innerHTML = c.nav
        anchor.setAttribute("href", c.href)
        nav.append(anchor)

        if (i < crumbs.length-1) {
            const caret = document.createElement("span")
            caret.innerHTML = " > "
            nav.append(caret)
        }
    }

}

async function onhashchange(){

    const documenthash = (window.location.hash.split("/").length) ? window.location.hash.split("/")[1] : null

    if (documenthash) {
        const user = await articleuservoornemensread()
        navs([{nav: user["username"] || user["wwdwid"], href: "#/" + user["wwdwid"]}])
    }
    else  {
        await articleusernamesls()
        navs()
    }

}


window.onload = async ()=>{

    await fetchSessionLoad(); // vóór onhashchange?!

    document.getElementById("loginsubmit").addEventListener("click", fetchSession)
    document.getElementById("logoutsubmit").addEventListener("click", fetchSessionClear)

    window.addEventListener("hashchange", onhashchange, false);

    onhashchange() // start

}
