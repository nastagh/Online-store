import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export class Search extends Filter {
  private textInput: HTMLInputElement;
  public readonly html: HTMLElement;
  protected value: string;

  constructor(name: string) {
    super(name);

    this.textInput = document.createElement("input");
    this.textInput.type = "search";
    this.textInput.placeholder = "Search";
    this.textInput.classList.add("input-style");
    this.textInput.name = "search";
    this.textInput.autofocus = true;
    this.textInput.autocomplete = "off";
    this.textInput.id = "search";
    this.textInput.value = this.value ? this.value : "";
    this.html = this.textInput;

    this.textInput.oninput = () => {
      this.value = this.textInput.value;
      this.updateHandler();
    };
  }

  filter(arr: ProductCard[]): ProductCard[] {
    const errorMessage = document.getElementsByClassName(
      "error-message"
    )[0] as HTMLElement;
    if (this.value) {
      const filtered = arr.filter((el: ProductCard) =>
        el.productData.name
          .toLowerCase()
          .includes(this.value.trim().toLowerCase())
      );
      errorMessage.classList.add("hidden");

      if (!filtered.length) {
        errorMessage.classList.remove("hidden");
      }
      return filtered;
    } else {
      errorMessage.classList.add("hidden");
      return arr;
    }
  }

  clear(): void {
    this.clearState();
    this.value = "";
    this.textInput.value = "";
  }
}
