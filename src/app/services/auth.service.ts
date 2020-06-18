import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost:8085/';

    constructor(private http: HttpClient,
                private router: Router) {
    }

    login(user) {
        return this.http.post(this.url + 'login', user, {observe: 'response'});
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    register(user) {
        return this.http.post(this.url + 'register', user);
    }

    saveToken(jwToken) {
        localStorage.setItem('token', 'Bearer ' + jwToken);
    }

    loadToken() {
        return localStorage.getItem('token');
    }
    currentUser() {
        if(this.isAuthenticated()){
            let token=this.loadToken();
            let jwth = new JwtHelperService();
            return jwth.decodeToken(token);
        }
        return null;
    }

    isAuthenticated() {
        if (this.loadToken() == null) {
            return false;
        }
        let token=this.loadToken();
        let jwth = new JwtHelperService();
        return !(jwth.isTokenExpired(token));
    }
    isSuperAdmin(){
        if(this.isAuthenticated()){
            let token=this.loadToken();
            let jwth = new JwtHelperService();
            return jwth.decodeToken(token).roles.includes("SuperAdmin");
        }
        return false;
    }
    isAdminOrganisation(){
        if(this.isAuthenticated()){
            let token=this.loadToken();
            let jwth = new JwtHelperService();
            return jwth.decodeToken(token).roles.includes("AdminOrganisation");
        }
        return false;
    }
    isStudent(){
        if(this.isAuthenticated()){
            let token=this.loadToken();
            let jwth = new JwtHelperService();
            return jwth.decodeToken(token).roles.includes("Student");
        }
        return false;
    }
    isProfessor(){
        if(this.isAuthenticated()){
            let token=this.loadToken();
            let jwth = new JwtHelperService();
            return jwth.decodeToken(token).roles.includes("Professor");
        }
        return false;
    }
}
