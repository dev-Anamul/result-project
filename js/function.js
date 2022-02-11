//Local stroge Function

function senddata(key ,arr) {
    let data = JSON.stringify(arr)
    localStorage.setItem(key, data)
    return true
    
}

function getdata(key) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : false ;
    
}


// for result published
