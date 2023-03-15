import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';

const url = "http://localhost:9292/api/users"
const urlToken = "http://localhost:9292/token"
const urlClient = "http://localhost:9292/api/client"

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  token = "";

  constructor(private http:HttpClient) {
    this.http.get<{'token':''}>(urlToken).subscribe(data =>  this.token = data.token

    );
  }

  getAllUsers() {
    //, {headers : new HttpHeaders().set('X-Auth-Token', this.token['token'])}
    this.http.get(url, {headers : new HttpHeaders().set('x-auth-token', this.token)}).subscribe(data=>console.log(data))
  }

  public createClient(client: Client){
    return this.http.post<Client>(urlClient, client, {headers : new HttpHeaders().set('x-auth-token', this.token)}).subscribe();
  }
}

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set("Authorization", "Requestor-Type")
    });
    return next.handle(xhr);
  }
}
