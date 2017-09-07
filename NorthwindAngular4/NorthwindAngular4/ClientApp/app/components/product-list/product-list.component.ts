import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';

@Component({
    selector: 'productlist',
    templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit {
    public products: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.populateProducts();
    }

    private populateProducts() {
        this.productService.getProducts()
            .subscribe(result => {
                this.products = result;
            }, error => console.error(error));
    }
}