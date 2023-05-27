window.onload = function(){
    var GET = {};
    var queryString = window.location.search.replace(/^\?/, '');

    queryString.split(/\&/).forEach(function(keyValuePair) {
        var paramName = keyValuePair.replace(/=.*$/, ""); // some decoding is probably necessary
        var paramValue = keyValuePair.replace(/^[^=]*\=/, ""); // some decoding is probably necessary
        GET[paramName] = paramValue;
    });

    

    addToCart(GET.idForm, GET.nameForm, GET.priceForm);
    

}
async function addToCart(id, name, price) {

    console.log(id);
    const authToken = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');
    console.log(user);

    let setting = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${authToken}`,
            'User': user
        },
        body: JSON.stringify({id, name, price })
    };
    console.log(setting.body);
    const response = await  fetch("http://localhost:4000/", setting);
    
    const jsonData = await  response.json();
    sessionStorage.setItem('cart', JSON.stringify(jsonData));
    const url = `./home.html?data=${encodeURIComponent(JSON.stringify(jsonData))}`;
    window.location.href = url;
}
