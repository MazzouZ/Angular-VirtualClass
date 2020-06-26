import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  obj :any;
  objUser :any;
  url='http://localhost:8085/';
  public resultdata:any;

  constructor(private http: HttpClient,private authService:AuthService) { }

  getItems(type :String) {
    return this.http.get(this.url+type,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }
  getlinkItem(type :string) {
    return this.http.get(type,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }

  addItem(type :String,object: any) {
    return this.http.post(this.url+type, object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
          this.resultdata =data;
        },error => {
          console.log(error);
            this.authService.logout();
        }
    );
  }

  addLinkItem(object: any,username :String,itemId :number) {
    return this.http.post('http://localhost:8085/ComPost/'+itemId+'/'+username, object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
          this.resultdata =data;
        },error => {
          console.log(error);
           
        }
    );
  }

  addLinkItemDevoir(object: any,username :String,itemId :number) {
    return this.http.post('http://localhost:8085/ComDevoir/'+itemId+'/'+username, object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
          this.resultdata =data;
        },error => {
          console.log(error);
           
        }
    );
  }

  addLinkItemPost(object: any,username :String,itemId :number) {
    return this.http.post('http://localhost:8085/postAdd/'+itemId+'/'+username, object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
          this.resultdata =data;
        },error => {
          console.log(error);
           
        }
    );
  }

  addLinkCoursDevoir(object: any,username :String) {
    return this.http.post('http://localhost:8085/devoirAdd/'+username, object,
        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
        data =>{
          console.log(data);
          this.resultdata =data;
        },error => {
          console.log(error);
           
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

  linkItemCoursOrg(type,object,orgLink){
    return this.http.post(this.url+type, object,
      {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
      data =>{
        this.obj = data;
        console.log(data);
        //console.log(orgLink);
        //console.log(this.obj._links.organisation.href);
        this.http.put(this.obj._links.organisation.href,orgLink,
          {headers:new HttpHeaders({'Content-Type':'text/uri-list','Authorization':this.authService.loadToken()})}).subscribe(
          data =>{
            console.log(data);
          },error => {
            console.log(error);
          }
      );
      },error => {
        console.log(error);
          this.authService.logout();
      }
  );
  }

  getCurrentUser(){
    return this.http.get('http://localhost:8085/mzUsers/search/byUsername?username='+this.authService.currentUser().sub,
      {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }
}
