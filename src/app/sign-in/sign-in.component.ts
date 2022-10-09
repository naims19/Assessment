import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationError } from 'validation-utils';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // })
  submitted = false;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private route: Router,) { }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
    //   password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    // })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
      this.route.navigate(['dashboard'])
    }
  }

  get f(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  onSubmit(): void {

    const { username, password } = this.form;
    
    this.authService.login(username, password).subscribe({
      next: data =>{
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        
      },
      error: err =>{
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

    // this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // console.log(JSON.stringify(this.form.value, null, 2));
  }

  reloadPage() : void {
    window.location.reload();
  }


}
