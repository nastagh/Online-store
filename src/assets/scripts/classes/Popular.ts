import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export class PopularFilter extends Filter {
  private checkbox: HTMLInputElement;
  public readonly html: HTMLElement;
  protected value: boolean;

  constructor(name: string) {
    super(name);

    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";
    this.checkbox.classList.add("popular-container_chekbox");
    this.html = this.checkbox;
    this.checkbox.checked = this.value;

    this.checkbox.onclick = () => {
      this.value = this.checkbox.checked;
      this.updateHandler();
    };
  }

  filter(arr: ProductCard[]): ProductCard[] {
    if (!this.checkbox.checked) return arr;
    return arr.filter((el: ProductCard) => el.productData.popular);
  }

  clear(): void {
    this.clearState();
    this.checkbox.checked = false;
  }
}
