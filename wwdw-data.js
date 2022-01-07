// wwdw-data.js

const LAMBDA = 'https://8lgmayxgl6.execute-api.eu-central-1.amazonaws.com/default/wwdw'

async function fetchData( lambda = LAMBDA, article, loginname ) {

    const cookiewwdw = document.cookie.split(";").find(c=>c.includes("wwdwsession"))
    const wwdwsession = (cookiewwdw) ? cookiewwdw.split("=")[1] : undefined;

    let documenthash 
    if (loginname!=="session") documenthash = window.location.hash.split("/")[1] ;

    const body = JSON.stringify({
        documenthash: documenthash || undefined,
        wwdwsession: wwdwsession || undefined, 
        article: article || undefined,
        loginname: loginname || undefined
    })

    //console.log("fetchData req", body)

    const res = await fetch(lambda, {
        method: "POST",
        body
    })

    const resjson = await res.json()

    //const resjson = await res.text()

    //console.log("resjson", resjson)

    return resjson ;

};

async function fetchSessionClear() {


    const expiry = new Date( "1970-01-01" );

    document.cookie=`wwdwsession=null;expires=${expiry.toUTCString()};`;
    document.getElementById("loginwwdwid").innerHTML=""

    window.dispatchEvent(new HashChangeEvent("hashchange")); 

    document.getElementById("login").style.display = "flex"
    document.getElementById("logout").style.display = "none"

}

async function fetchSessionLoad() {

    const user = await fetchData ( LAMBDA, null, "session" ) 

    if (user && user["wwdwid"]) {
        document.getElementById("logoutusername").value = user["username"] || user["wwdwid"]
        document.getElementById("loginwwdwid").innerHTML = user["wwdwid"]
        document.getElementById("login").style.display = "none"
        document.getElementById("logout").style.display = "flex"
    }

}


async function fetchSession() {

    const loginname = document.getElementById("loginname").value 

    const user = await fetchData ( LAMBDA, null, loginname ) 

    //console.log("fetchSession user", user)

    const wwdwsession = user["wwdwsession"] 

    const expiry_sec = 365 * 24 * 60 * 60 ;
    const expiry = new Date( new Date().getTime() + expiry_sec * 1000 ) ; 

    document.cookie=`wwdwsession=${wwdwsession};expires=${expiry.toUTCString()};`;

    if (!window.location.hash.split("/")[1]) document.location.hash = "#/" + user["wwdwid"]
    else window.dispatchEvent(new HashChangeEvent("hashchange")); 

    document.getElementById("logoutusername").value = user["username"]
    document.getElementById("loginwwdwid").innerHTML = user["wwdwid"]
    document.getElementById("login").style.display = "none"
    document.getElementById("logout").style.display = "flex"

}

export { fetchData, fetchSession, fetchSessionClear, fetchSessionLoad };
