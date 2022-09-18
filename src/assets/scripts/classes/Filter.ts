import { ProductCard } from "./ProductCard";

export abstract class Filter {
  protected value: unknown;
  protected updateHandler: () => void = () => {
    this.saveState();
  };
  public abstract filter(arr: ProductCard[]): ProductCard[];
  public abstract clear(): void;

  constructor(public name: string) {
    this.loadState();
  }

  public saveState() {
    localStorage.setItem(this.name, JSON.stringify(this.value));
  }

  public loadState() {
    this.value = JSON.parse(localStorage.getItem(this.name));
  }

  public clearState() {
    localStorage.removeItem(this.name);
  }

  public setUpdateHandler(func: () => void) {
    this.updateHandler = () => {
      this.saveState();
      func();
    };
  }
}
