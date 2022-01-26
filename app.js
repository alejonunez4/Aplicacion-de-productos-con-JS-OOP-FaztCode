class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {

    //añadir producto
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class = "card tex-center mb-4">
                <div class = "card-body">
                    <strong>Product</strong>: ${product.name}
                    <strong>Price</strong>: ${product.price} $
                    <strong>Year</strong>: ${product.year}
                    <a href="#" name ="delete" class = "btn btn-danger">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    //resetear formulario
    resetForm() {
        document.getElementById('product-form').reset();
    }

    //eliminar prodcuto
    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado satisfactoriamente', 'dark');
        }
    }


    //mostrar mensaje
    showMessage(menssage, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(menssage));

        //mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app) //inserto el mensaje despues de el div con clase container pero antes del div con id app

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 4000) //luego de 4 segundos se elimina la alerta.
    }
}

//Eventos del DOM

//para agregar producto y resetear formulario cuando lo hagamos
document.getElementById('product-form').addEventListener('submit', function (evento) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui = new UI();
    if (name === '' || price === '' || year === '') {
        return ui.showMessage('Complete los campos por favor', 'danger');
    }

    ui.addProduct(product);

    ui.resetForm();

    ui.showMessage('Producto agregado satisfactoriamente', 'success');
    evento.preventDefault(); //cancelando que la pagina se refresque por defecto al enviar los datos del formulario
})

//para eliminar producto
document.getElementById('product-list').addEventListener('click', function (evento) {
    const ui = new UI();
    ui.deleteProduct(evento.target); //target se le dice a lo que se crea
})