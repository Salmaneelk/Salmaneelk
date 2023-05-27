window.onload = function(){

    document.getElementById("logoutBtn").addEventListener("click", logout);

    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    document.getElementById("username").innerText = user.username;

    getProducts();

    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('data');

    const data = JSON.parse(decodeURIComponent(dataString));
    if(data){
        for(d of data){
        document.getElementById("noItems").style.display = "none";
        document.getElementById("divItemsList").style.display = "block";
        
        const row = document.createElement('tr');
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(d.name));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(d.price));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(d.total));
        row.appendChild(cell);

        cell = document.createElement('td');

        const formDec = document.createElement('form');
        formDec.setAttribute("method", "get");
        formDec.setAttribute("action", "decrease.html");

        const idFormDec = document.createElement("input");
        idFormDec.setAttribute("value", d.id);
        idFormDec.setAttribute("name", "idFormDec");
        idFormDec.setAttribute("type", "hidden");

    

        const sDes = document.createElement("button");
        sDes.setAttribute("type", "submit");
        sDes.setAttribute("value", "Submit");
        sDes.innerText = "-"

        formDec.appendChild(idFormDec);
        formDec.appendChild(sDes);

        cell.appendChild(formDec);

        cell.appendChild(document.createTextNode(d.quantity));


        const formInc = document.createElement('form');
        formInc.setAttribute("method", "get");
        formInc.setAttribute("action", "increase.html");

        const idFormInc = document.createElement("input");
        idFormInc.setAttribute("value", d.id);
        idFormInc.setAttribute("name", "idFormInc");
        idFormInc.setAttribute("type", "hidden");

    

        const sInc = document.createElement("button");
        sInc.setAttribute("type", "submit");
        sInc.setAttribute("value", "Submit");
        sInc.innerText = "+"

        formInc.appendChild(idFormInc);
        formInc.appendChild(sInc);

        cell.appendChild(formInc);
        row.appendChild(cell);
    

        document.getElementById('tbodyItemsList').appendChild(row);
        }
    }

    document.getElementById("placeOrder").addEventListener("click", placeOrder);

}

function logout(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    window.location.href = "./login.html";
}

async function placeOrder() {
    console.log("TEST");
    const authToken = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');
    const cart = sessionStorage.getItem('cart');
    console.log(JSON.stringify({cart: cart}));
    const response = await fetch("http://localhost:4000/palce-order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${authToken}`,
          'User': user
        },
        body: JSON.stringify({cart: cart})
    });
    const data = await response.json();
    console.log("==>",data);
    sessionStorage.setItem('cart', JSON.stringify(data));    
    const url = `./home.html?data=${encodeURIComponent(JSON.stringify(data))}`;
    window.location.href = url;

}


async function getProducts() {
    const authToken = sessionStorage.getItem('authToken');
    const response = await fetch("http://localhost:4000/", {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
    });
    const jsonData = await response.json();
    console.log(jsonData);

    for (let e of jsonData) {
        addNewProductRowToTable(e.prodId, e.name, e.price, e.image, e.stock);
    }

}


function addNewProductRowToTable(id, name, price, image, stock) {
    console.log(image);

    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(name));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    cell = document.createElement('td');
    // cell.appendChild(document.createTextNode(image));
    const imagefront = document.createElement('img')
    console.log(image);
    imagefront.setAttribute("src", "" + image);
    cell.appendChild(imagefront);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(stock));
    row.appendChild(cell);


    cell = document.createElement('td');

    const form = document.createElement('form');
    form.setAttribute("method", "get");
    form.setAttribute("action", "addTocart.html");

    const idForm = document.createElement("input");
    idForm.setAttribute("value", id);
    idForm.setAttribute("name", "idForm");
    idForm.setAttribute("type", "hidden");

    const nameForm = document.createElement("input");
    nameForm.setAttribute("value", name);
    nameForm.setAttribute("name", "nameForm");
    nameForm.setAttribute("type", "hidden");

    const priceForm = document.createElement("input");
    priceForm.setAttribute("value", price);
    priceForm.setAttribute("name", "priceForm");
    priceForm.setAttribute("type", "hidden");

    

    const s = document.createElement("button");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.innerText = "Add to cart"

    form.appendChild(idForm);
    form.appendChild(nameForm);
    form.appendChild(priceForm);
    form.appendChild(s);

    cell.appendChild(form);
    row.appendChild(cell);
    

    document.getElementById('tbodyProductList').appendChild(row);

}