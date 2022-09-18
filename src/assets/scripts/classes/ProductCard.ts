export interface ProductData {
  id: number;
  img: string;
  name: string;
  stock: number;
  year: number;
  company: string;
  color: string;
  size: number;
  popular: boolean;
}

export class ProductCard {
  private options: ProductData;
  private isSelected = false;
  public onSelect: (card: ProductData) => void;
  public onDeselect: (card: ProductData) => void;
  private basketSign: HTMLElement;
  public readonly html: HTMLElement;

  constructor(options: ProductData) {
    this.options = options;
    this.html = this.createCard();
  }

  private createCard(): HTMLElement {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("product-card__img");

    const imgElem = document.createElement("img");
    imgElem.src = this.options.img;
    imgElem.alt = this.options.name;
    imgElem.title = this.options.name;

    imgContainer.append(imgElem);

    const nameContainer = document.createElement("p");
    nameContainer.classList.add("product-card__name");
    nameContainer.innerHTML = `<strong>${this.options.name}</strong>`;

    const propertiesContainer = document.createElement("ul");
    propertiesContainer.classList.add("product-properties");

    const productProperties = [
      "stock",
      "year",
      "company",
      "color",
      "size",
      "popular",
    ];

    Object.entries(this.options) // [[key1, value1], [key2, value2], ....]
      .filter(([k]) => productProperties.includes(k))
      .forEach(([k, v]) => propertiesContainer.append(this.createLi(k, v)));

    this.basketSign = document.createElement("div");
    this.basketSign.classList.add("basket-sign", "only-card", "hidden");

    [imgContainer, nameContainer, propertiesContainer, this.basketSign].forEach(
      (el) => productCard.append(el)
    );

    productCard.addEventListener("click", () => {
      this.isSelected = !this.isSelected;
      this.basketSign.classList.toggle("hidden");
      if (this.isSelected) {
        this.onSelect(this.options);
      } else {
        this.onDeselect(this.options);
      }
    });

    return productCard;
  }

  createLi(key: string, value: string | boolean) {
    const li = document.createElement("li");
    if (typeof value === "boolean") {
      value = value ? "Yes" : "No";
    }
    li.innerHTML = `${key.replace(key[0], key[0].toUpperCase())}: ${value}`;
    return li;
  }

  public select() {
    this.isSelected = true;
    this.basketSign.classList.remove("hidden");
  }

  public deselect() {
    this.isSelected = false;
    this.basketSign.classList.add("hidden");
  }

  public get productData(): ProductData {
    return { ...this.options } as ProductData;
  }
}
