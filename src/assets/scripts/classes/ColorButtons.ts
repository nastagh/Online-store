import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export class ColorFilter extends Filter {
  private buttonContainer: HTMLElement;
  public readonly html: HTMLElement;
  protected value: string[];

  constructor(name: string, arr: string[]) {
    super(name);
    if (!this.value) {
      this.value = [];
    }
    this.buttonContainer = document.createElement("div");

    this.buttonContainer.classList.add("color-button-container");

    arr.forEach((el) => {
      const button = document.createElement("button");
      button.classList.add("color-button");
      button.classList.add(`color-button_${el}`);
      button.value = el;
      this.buttonContainer.append(button);
      if (this.value.includes(el)) {
        button.classList.add("color-button_selected");
      }
    });

    this.html = this.buttonContainer;

    this.buttonContainer.onclick = (e) => {
      if (e.target instanceof HTMLButtonElement) {
        const currentValue = e.target.value;
        e.target.classList.toggle("color-button_selected");
        if (this.value.includes(currentValue)) {
          this.value = this.value.filter((el) => el !== currentValue);
        } else {
          this.value.push(currentValue);
        }
      }
      this.updateHandler();
    };
  }

  filter(arr: ProductCard[]): ProductCard[] {
    if (!this.value.length) return arr;
    return arr.filter((el: ProductCard) =>
      this.value.includes(el.productData.color.toLowerCase())
    );
  }

  clear(): void {
    this.clearState();
    this.value = [];
    this.buttonContainer.childNodes.forEach((el) =>
      (el as HTMLButtonElement).classList.remove("color-button_selected")
    );
  }
}
