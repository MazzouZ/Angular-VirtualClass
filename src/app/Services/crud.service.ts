import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url='http://localhost:8085/';

  constructor(private http: HttpClient) { }

  getItems(type :String) {
    return this.http.get(this.url+type);
  }

  addItem(type :String,object: any) {
    return this.http.post(this.url+type, object).subscribe(
        data =>{
          console.log(data);
        },error => {
          console.log(error);
        }
    );
  }

  deleteItem(object:any) {
    return this.http.delete(object._links.self.href).subscribe(
        data =>{
            console.log(data);
        },error => {
            console.log(error);
        }
    );
  }

  updateItem(object) {
    return this.http.put(object._links.self.href,object).subscribe(
        data =>{
          console.log(data);
        },error => {
          console.log(error);
        }
    );
  }
}
