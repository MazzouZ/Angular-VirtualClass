import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpResponse} from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    formGroup: FormGroup;

    matcher = new MyErrorStateMatcher();

    private mz = 69;
    private registerMode = false;

    constructor(private authService: AuthService, private route: Router) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
            confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
            organisationName: new FormControl('', [Validators.required]),
        });
    }

    onLogin(f) {
        if (this.registerMode) {
            this.registerMode = false;
        } else {
            const {['email']: v1, ...c1} = f;
            const {['confirmedPassword']: v2, ...c2} = c1;
            const {['organisationName']: v3, ...UserLogin} = c2;
            this.authService.login(UserLogin).subscribe(
                (myResponse:HttpResponse<Object>)=>{
                     let jwt=myResponse.headers.get('Authorization');
                     this.authService.saveToken(jwt);
                     this.route.navigateByUrl('/organisations');
                }, error => {
                  this.mz = 89;
                  setTimeout(() => {
                    this.mz = 69;
                  }, 4000);
                });

        }

    }

    onRegister(f) {
        if (!this.registerMode) {
            this.registerMode = true;
        } else {
            this.authService.register(f).subscribe(
                (myResponse) => {
                    console.log(myResponse);
                }, error => {
                    this.mz = 39;
                    setTimeout(() => {
                        this.mz = 69;
                    }, 4000);
                });
        }
    }
}
