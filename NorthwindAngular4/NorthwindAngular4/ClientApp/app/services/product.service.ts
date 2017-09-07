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

    //getProducts() {
    //    return this.http.get(this.endpoint)
    //        .map(res => res.json());
    //}

    getProducts(filter: any) {
        return this.http.get(this.endpoint + '?' + this.toQueryString(filter))
            .map(res => res.json());
    }

    toQueryString(obj: any) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }

        return parts.join('&');
    }
}