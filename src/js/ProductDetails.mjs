import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  renderProductDetails() {
    const container = document.querySelector('.product-detail');
    container.innerHTML = `
      <h2>${this.product.Name}</h2>
      <p>${this.product.Description}</p>
      <p>Price: $${this.product.Price}</p>
      <button id="addToCart">Add to Cart</button>
    `;
  }

  addToCart() {
    let cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    alert(`${this.product.Name} added to cart!`);
  }
}
