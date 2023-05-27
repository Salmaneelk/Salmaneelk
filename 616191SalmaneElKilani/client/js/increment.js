window.onload = function(){
    var GET = {};
    var queryString = window.location.search.replace(/^\?/, '');

    queryString.split(/\&/).forEach(function(keyValuePair) {
        var paramName = keyValuePair.replace(/=.*$/, "");
        var paramValue = keyValuePair.replace(/^[^=]*\=/, "");
        GET[paramName] = paramValue;
    });

    

    increment(GET.idFormInc);
    

}
async function increment(id) {
    const authToken = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');

    let setting = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${authToken}`,
            'User': user
        },
    };
    console.log(setting.body);
    const response = await  fetch("http://localhost:4000/increase/" + id, setting);
    
    const jsonData = await  response.json();
    sessionStorage.setItem('cart', JSON.stringify(jsonData));    
    const url = `./home.html?data=${encodeURIComponent(JSON.stringify(jsonData))}`;
    window.location.href = url;
}
