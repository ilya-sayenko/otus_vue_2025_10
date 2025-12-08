export class CartService {

  static instance = null

  constructor() {
    if (CartService.instance) {
      return CartService.instance
    } else {
      this.data = new Map()
      CartService.instance = this
    }
  }

  putProduct(product) {
    if (this.data.has(product.id)) {
      let productData = this.data.get(product.id)
      this.data.set(product.id, {...product, count: productData.count + 1})
    } else {
      this.data.set(product.id, {...product, count: 1})
    }
  }

  getProducts() {
    return Array.from(this.data.values())
  }

  removeProduct(id) {
    this.data.delete(id)
  }

  removeAllProducts() {
    this.data.clear()
  }
}