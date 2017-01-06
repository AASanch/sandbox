import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Item } from "./item";

@Injectable()
export class ItemService {
    constructor(private http: Http) { }

    private baseUrl = "api/items";

    public getLatest(num?: number)  {
        let url = `${this.baseUrl}/GetLatest/`;
        if (num != null) { url += num; }
        return this.http
            .get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public getRandom(num?: number) {
        let url = `${this.baseUrl}/GetRandom/`;
        if (num != null) { url += num; }
        return this.http
            .get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public getMostViewed(num?: number) {
        let url = `${this.baseUrl}/GetMostViewed`;
        if (num != null) { url += num; }
        return this.http
            .get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(err: Response): Observable<any> {
        console.log(err);
        return Observable.throw(err.json().error || "Server error");
    }
}