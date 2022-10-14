import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.route.navigate(['/dashboard'])
      this.roles = this.tokenStorage.getUser().roles;
    }
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

  }

  reloadPage() : void {
    window.location.reload();
  }


}
