/*
/!*console.log("Request Data");*!/
/!*

setTimeout(() => {
    console.log("Preparing data")
    const data = {
        version: "1.0",
        status: "working"
    }

    setTimeout(() => {
        data.trulala = true
        console.log("Response: ", data)
    }, 2000)

}, 2000)*!/

//example 2
/!*
const p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("Preparing data")
        const data = {
            version: "1.0",
            status: "working"
        }
        resolve(data)
    }, 2000)
});

p.then(data => {
    const p2 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            data.trulala = true
            resolve(data)

        }, 2000)

    })

    p2.then(data => {
        console.log(data)
    })
})
*!/

//example 3
/!*const p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log("Preparing data")
        const data = {
            version: "1.0",
            status: "working"
        }
        resolve(data)
    }, 2000)
});
p.then(data => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            data.trulala = true
            reject(data)
            /!*  console.log(data)*!/
        }, 2000)
    })
})
    .then(data => {
        data.valod = true
        console.log(data)
    })
     .catch(error => {
    console.log('Some error')
})*!/


function sayHello (name) {
    return new Promise(function (resolve, reject){
        setTimeout(()=>{
          console.log( "Say hello " + name)
            resolve();
        },2000)

    })
}

/!*
sayHello("Tatev")
    .then(()=>sayHello("Valod"))
    .then(()=>sayHello("Sevak"))
*!/

( async function (){
    await sayHello("Tatev")
    await sayHello("Valod")
    await sayHello("Sevak")
    await sayHello("Nelli")
    })()



/!*


p.then(data=>{
    return new Promise(function (resolve, reject){
        setTimeout(()=>{
            console.log(data +" Tatev")
            resolve(data)
        },2000)
    })
})

.then(data=>{
    return new Promise(function (resolve, reject){
        setTimeout(()=>{
            console.log(data +" Ani")
            resolve(data)
        },2000)
    })
})

.catch(error=>{
    console.log('ERROR')
})*!/
*/
