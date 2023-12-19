import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  constructor() {
    this.productForm = new FormGroup({
      productCode: new FormControl(null, Validators.required),
      productName: new FormControl('123-123', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Form invalid');
      return;
    }
    console.log(this.productForm.value);
  }
}
