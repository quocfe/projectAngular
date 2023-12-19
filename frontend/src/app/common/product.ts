export class Product {
  productCode: string;
  productName: string;
  starRating: number = 0;

  constructor(productCode: string, productName: string) {
    this.productCode = productCode;
    this.productName = productName;
  }
}
