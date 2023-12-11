import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpRequestsService{
    private apiUrl = 'http://localhost:3000/api'

    constructor(private http: HttpClient) {}

    get(endpoint: string): Observable<any> {
        const url: string = `${this.apiUrl}/${endpoint}`;
        return this.http.get(url);
    }

    post(endpoint: string, data: any): Observable<any> {
        const url: string = `${this.apiUrl}/${endpoint}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(url, data, {headers});
    }

}
