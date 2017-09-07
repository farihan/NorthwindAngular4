import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private readonly endpoint = '/api/product';
    constructor(private http: Http) { }

    getProduct() {
        return this.http.get(this.endpoint)
            .map(res => res.json());
    }

    getProducts() {
        return this.http.get(this.endpoint)
            .map(res => res.json());
    }
}