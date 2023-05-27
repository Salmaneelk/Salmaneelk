let counter = 0;
class Item{
    constructor(name, price){
        this.id = ++counter;
        this.name = name;
        this.price = price;
        this.quantity = 1;
        this.total = this.price;
    }
}

module.exports = Item;