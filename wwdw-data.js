// wwdw-data.js

const LAMBDA = 'https://8lgmayxgl6.execute-api.eu-central-1.amazonaws.com/default/wwdw'

const fetchData = async ( lambda = LAMBDA, article ) => {

    const cookiewwdw = document.cookie.split(";").find(c=>c.includes("sessionwwdw"))
    const sessionwwdw = (cookiewwdw) ? cookiewwdw.split("=")[1] : null;

    const documenthash = window.location.hash.split("/")[1] || undefined

    const body = JSON.stringify({
        sessionwwdw, 
        documenthash,
        article
    })

    console.log("fetchData req", body)

    const res = await fetch(lambda, {
        method: "POST",
        body
    })

    const resjson = await res.json()

    //const resjson = await res.text()

    return resjson ;

};


function fetchSession() {

    console.log("fetchSession")

    const sessionid = "dws123456789aabb"

    const expiry_sec = 365 * 24 * 60 * 60 ;
    const expiry = new Date( new Date().getTime() + expiry_sec * 1000 ) ; // expiry in sec

    document.cookie=`sessionwwdw=${sessionid};expires=${expiry.toUTCString()};`;

}


//export { fetchData, fetchSession };
