const { log } = require('console');
const itemClass = require('./item');
const crypto = require('crypto');



class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
        this.cart = [];
    }

    static get(username, password){
        const user = users.find(u => u.username === username && u.password === password);
        return user;
    }

    static login(username, password){
        const user = users.find(u => u.username === username && u.password === password);
  
        if (user) {
            const timestamp = new Date().toISOString();
            const data = username + timestamp;
            const hash = crypto.createHash('sha256').update(data).digest('hex');
            return {status: true, message: hash, user: user}
        }else{
            return {status: false, message: 'Invalid Credentials'};
        }
    }

    addNewItem(id, name, price){
        const index = this.cart.findIndex(item => item.name === name);
        if(index>-1){
            this.increaseQuantity(id);
            
        }else{
            const item = new itemClass(name, price);
            this.cart.push(item);
        }
        
        return this.cart;
        
    }

    increaseQuantity(id){
        let index = -1;
        for(let i=0; i<this.cart.length; i++){
            let it = this.cart[i];
            console.log(">>><<<", id, "&&&", it.id == id);
            if(it.id == id){
                index = i;
            }
        }
        
        if(index > -1){
            this.cart[index].quantity += 1;
            this.cart[index].total = this.cart[index].quantity * this.cart[index].price;
            return this.cart;
        }else{
            throw new Error("item not found");
        }
    }

    decreaseQuantity(id){
        let index = -1;
        for(let i=0; i<this.cart.length; i++){
            let it = this.cart[i];
            if(it.id == id){
                index = i;
            }
        }
        
        if(index > -1){
            this.cart[index].quantity -= 1;
            if(this.cart[index].quantity == 0){
                this.cart.splice(index, 1);
                return this.cart;
            }
            this.cart[index].total = this.cart[index].quantity * this.cart[index].price;
            return this.cart;
        }else{
            throw new Error("item not found");
        }
    }
}

let users = [
    new User('salmane', '1234', []),
    new User('ankhtuya', '1234', []),
    new User('kennedy', '1234', [])
];

module.exports = User;