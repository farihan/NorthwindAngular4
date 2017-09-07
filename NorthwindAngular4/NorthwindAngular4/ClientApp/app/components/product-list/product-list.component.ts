﻿import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';

@Component({
    selector: 'productlist',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    public products: Product[];
    public query: any = {};
    public columns = [
        { title: 'ID', key: 'productid', isSortable: true },
        { title: 'Name', key: 'productname', isSortable: true },
        { title: 'Quantity', key: 'quantityperunit', isSortable: true },
        { title: 'Price', key: 'unitprice', isSortable: true },
        { title: 'In Stock', key: 'unitsinstock', isSortable: true },
        { title: 'Order', key: 'unitsonorder', isSortable: true },
        { title: 'Reorder Level', key: 'reorderlevel', isSortable: true },
        { title: 'Discontinued', key: 'discontinued', isSortable: true }
    ]

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.populateProducts();
    }

    private populateProducts() {
        this.productService.getProducts(this.query)
            .subscribe(result => {
                this.products = result;
            }, error => console.error(error));
    }

    sortBy(columnName: any) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }

        this.populateProducts();
    }
}