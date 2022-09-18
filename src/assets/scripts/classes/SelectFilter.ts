import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export class SelectFilter extends Filter {
  private selectInput: HTMLSelectElement;
  public readonly html: HTMLElement;
  protected value: string;

  constructor(name: string, arr: string[]) {
    super(name);

    this.value = this.value || "All";

    this.selectInput = document.createElement("select");
    this.selectInput.name = "filter-input";
    this.selectInput.classList.add("input-style");

    arr.forEach((el: string) => {
      const option = document.createElement("option");
      option.value = el;
      option.innerHTML = el;
      return this.selectInput.append(option);
    });

    this.html = this.selectInput;
    this.selectInput.value = this.value;

    this.selectInput.oninput = () => {
      this.value = this.selectInput.value;
      this.updateHandler();
    };
  }

  filter(arr: ProductCard[]): ProductCard[] {
    this.value = this.selectInput.value;
    if (this.value === "All") return arr;

    return arr.filter(
      (el: ProductCard) => this.value === el.productData.company
    );
  }

  clear(): void {
    this.selectInput.value = "All";
    this.value = this.selectInput.value;
    this.clearState();
  }
}
