import { ProductData } from "./ProductCard";

export class Basket {
  private products: ProductData[] = [];

  constructor(private maxAmount: number) {
    this.loadState();
  }

  public add(product: ProductData): boolean {
    if (this.products.length === this.maxAmount) {
      alert("Sorry, all slots are full");

      return false;
    } else {
      this.products.push(product);
      this.saveState();

      return true;
    }
  }

  public remove(id: number) {
    this.products = this.products.filter((el) => el.id != id);
    this.saveState();
  }

  public get amount() {
    return this.products.length;
  }

  public contains(id: number) {
    return Boolean(this.products.filter((el) => el.id === id).length);
  }

  private saveState() {
    localStorage.setItem("basket_items", JSON.stringify(this.products));
  }

  private loadState() {
    const savedState = JSON.parse(localStorage.getItem("basket_items"));
    if (savedState && savedState instanceof Array) {
      this.products = savedState;
    }
  }
}
