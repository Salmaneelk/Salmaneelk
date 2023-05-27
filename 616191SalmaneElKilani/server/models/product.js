let products = [
    {prodId: 1, name: 'Ball', price: 9.99, image: '../server/images/ball.jpg', stock: 4},
    {prodId: 2, name: 'Boots', price: 19.99, image: '../server/images/boots.jpg', stock: 5},
    {prodId: 3, name: 'Jersey', price: 29.99, image: '../server/images/Jersey.jpg', stock: 13}
]

class Product{
    constructor(id, name, price, image, stock){
        this.prodId = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    static getAll(){
        return products;
    }

    static checkEnoughStock(prodId, quantity){
        const index = products.findIndex(prod => prod.prodId == prodId);
        if(index > -1){
            let st = products[index].stock;
            if(st>= quantity){
                products[index].stock -= quantity;
                return true;
            }else{
                return new Error('Stock is less than quantity');
            }
        }else{
            return new Error('Product not found');
        }
    }
}
module.exports = Product;