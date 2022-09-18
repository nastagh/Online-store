import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export class SizeFilter extends Filter {
  private buttonContainer: HTMLElement;
  public readonly html: HTMLElement;
  private arrStr: string[];
  private selectedButton: HTMLButtonElement;
  protected value: [number, number];

  constructor(name: string, arr: string[]) {
    super(name);

    this.arrStr = arr;
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("size-container");

    this.arrStr.forEach((el: string) => {
      const button = this.createOptionButton(el);
      if (this.value && el === `${this.value[0]}-${this.value[1]}`) {
        this.selectedButton = button;
      }
      this.buttonContainer.append(button);
    });
    this.markSelectedButton();
    this.html = this.buttonContainer;

    this.buttonContainer.onclick = (e) => {
      if (e.target instanceof HTMLButtonElement) {
        const values = (e.target as HTMLButtonElement).value
          .split("-")
          .map((s) => parseInt(s));
        this.value = [values[0], values[1]];
        this.selectedButton = e.target;
        this.markSelectedButton();
        this.updateHandler();
      }
    };
  }

  createOptionButton(buttonValue: string) {
    const button = document.createElement("button");
    button.value = buttonValue;
    button.classList.add("button");
    button.innerHTML = `${buttonValue} cm`;

    return button;
  }

  markSelectedButton() {
    this.buttonContainer.childNodes.forEach((el) => {
      if (el === this.selectedButton) {
        (el as HTMLButtonElement).classList.add("size-button-selected");
      } else {
        (el as HTMLButtonElement).classList.remove("size-button-selected");
      }
    });
  }

  filter(arr: ProductCard[]): ProductCard[] {
    if (this.value) {
      return arr.filter(
        (el: ProductCard) =>
          el.productData.size >= this.value[0] &&
          el.productData.size <= this.value[1]
      );
    } else {
      return arr;
    }
  }

  clear(): void {
    this.buttonContainer.childNodes.forEach((el) =>
      (el as HTMLButtonElement).classList.remove("size-button-selected")
    );
    this.value = undefined;
    this.clearState();
  }
}
