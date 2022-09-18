import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

export enum SettingsVariants {
  ALPHABET_ORDER = "Name from A to Z",
  REV_ALPHABET_ORDER = "Name from Z to A",
  YEAR_ASC = "Year, by ascending",
  YEAR_DESC = "Year, by descending",
}

export class Settings extends Filter {
  private sortInput: HTMLSelectElement;
  public readonly html: HTMLElement;
  protected value: SettingsVariants;
  private sortVariants: Record<
    SettingsVariants,
    (arr: ProductCard[]) => ProductCard[]
  >;

  constructor(name: string) {
    super(name);

    this.value = this.value || SettingsVariants.ALPHABET_ORDER;

    this.sortInput = document.createElement("select");
    this.sortInput.classList.add("input-style");

    Object.values(SettingsVariants).forEach((v) => {
      this.sortInput.append(this.createOption(v));
    });

    this.sortInput.value = this.value;

    this.sortVariants = {
      [SettingsVariants.ALPHABET_ORDER]: this.alphabetSort,
      [SettingsVariants.REV_ALPHABET_ORDER]: this.alphabetRevSort,
      [SettingsVariants.YEAR_ASC]: this.yearAscSort,
      [SettingsVariants.YEAR_DESC]: this.yearDescSort,
    };

    this.sortInput.oninput = () => {
      this.value = this.sortInput.value as SettingsVariants;
      this.updateHandler();
    };

    this.html = this.sortInput;
  }

  createOption(variant: SettingsVariants) {
    const option = document.createElement("option");
    option.value = variant;
    option.innerHTML = variant;

    return option;
  }

  filter(arr: ProductCard[]): ProductCard[] {
    return this.sortVariants[this.value](arr);
  }

  alphabetSort(arr: ProductCard[]): ProductCard[] {
    return arr.sort((a, b) =>
      a.productData.name.localeCompare(b.productData.name)
    );
  }

  alphabetRevSort(arr: ProductCard[]): ProductCard[] {
    return arr.sort((a, b) =>
      b.productData.name.localeCompare(a.productData.name)
    );
  }

  yearAscSort(arr: ProductCard[]): ProductCard[] {
    return arr.sort((a, b) => a.productData.year - b.productData.year);
  }

  yearDescSort(arr: ProductCard[]): ProductCard[] {
    return arr.sort((a, b) => b.productData.year - a.productData.year);
  }

  clear(): void {
    // this.clearState();
    // this.value = SettingsVariants.ALPHABET_ORDER;
    // this.sortInput.value = this.value;
  }
}
