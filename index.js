class ProductManager {
    constructor (){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: 0
        };

        // CONFIGURAR ID
        producto.id = this.products.length + 1;
        // ↑↑ preguntar porqué no me da el mismo resultado hacer this.products.lenght ++ , o que this.products.lenght += 1
        this.products.forEach(prod => {
            prod.id = prod.id++;
        });
        // ↑↑  preguntar porqué no me da el mismo resultado hacer this.products.lenght ++ , o que this.products.lenght + 1

        if (this.products.find(product => product.code == producto.code)){
            console.log(`El producto con el código ${producto.code} ya existe`);
        }else{
            return this.products.push(producto);
        }
    
    }




    // GET ALL PRODUCTS
    getProducts(){
        console.log("El listado de productos es")
        console.log(this.products)
    }


    // GET PRODUCTS BY ID
    getProductsById(id){
        let founded = this.products.filter(product => product.id == id);

        if (founded[0] == undefined){
            console.log("No se encontraron resultados")
        } else{
            console.log(founded)
        }
    }
}


let Pm = new ProductManager();

Pm.addProduct("tomate", "grande", 250, "c://documents", 10, 1);
Pm.addProduct("pizza", "mediana", 1500, "c://documents", 10, 5);
Pm.addProduct("autito", "plastico", 500, "https://www.youtube.com", 14, 10);



Pm.getProducts();

// Pm.getProductsById(2);