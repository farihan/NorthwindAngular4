import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NotificationService } from './../../services/notification.service';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';

@Component({
    selector: 'productlist',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    private readonly PAGE_SIZE = 10; 

    public queryResult: any = {};
    public query: any = {
        pageSize: this.PAGE_SIZE
    };
    public columns = [
        { title: 'ID', key: 'productid', isSortable: true },
        { title: 'Name', key: 'productname', isSortable: true },
        { title: 'Quantity', key: 'quantityperunit', isSortable: true },
        { title: 'Price', key: 'unitprice', isSortable: true },
        { title: 'In Stock', key: 'unitsinstock', isSortable: true },
        { title: 'Order', key: 'unitsonorder', isSortable: true },
        { title: 'Reorder Level', key: 'reorderlevel', isSortable: true },
        { title: 'Discontinued', key: 'discontinued', isSortable: true },
        { title: '', key: '', isSortable: false }
    ]

    constructor(private notificationService: NotificationService, private productService: ProductService) { }

    ngOnInit() {
        this.populateProducts();
    }

    private populateProducts() {
        this.productService.getProducts(this.query)
            .subscribe(result => {
                this.queryResult = result;
                this.notificationService.info('Products list loaded');
            }, error => {
                console.error(error);
                this.notificationService.error(error);
            });
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

    onPageChange(page: number) {
        this.query.page = page;
        this.populateProducts();
    }

    onFilterChange() {
        this.query.page = 1;
        this.populateProducts();
    }
}