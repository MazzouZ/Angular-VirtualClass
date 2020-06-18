import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url='http://localhost:8085/';

  constructor(private http: HttpClient,private authService:AuthService) { }

  getItems(type :String) {
    return this.http.get(this.url+type,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }

  addItem(type :String,object: any) {
    return this.http.post(this.url+type, object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
        },error => {
          console.log(error);
            this.authService.logout();
        }
    );
  }

  deleteItem(object:any) {
    return this.http.delete(object._links.self.href,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
            console.log(data);
        },error => {
            console.log(error);
            this.authService.logout();
        }
    );
  }

  updateItem(object) {
    return this.http.put(object._links.self.href,object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
        },error => {
          console.log(error);
            this.authService.logout();
        }
    );
  }
}
