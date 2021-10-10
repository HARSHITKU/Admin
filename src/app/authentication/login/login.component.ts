import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminCredentials } from 'src/app/models/admin-credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  brandName: string = 'ChotaPaisa.com';
  errorMessage: string = '';
  isCustomError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      phone: ['', Validators.required],
      otp: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit(credentials: AdminCredentials) {
    if (this.form!.valid) {
      this.isLoading = true;
      this.authService.login(credentials).subscribe((response: any) => {
        if (response) {
          if (response.user.role === 'admin') {
            localStorage.setItem('token', response.loginToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/chotapaisa']);
            this.isCustomError = false;
          }else{
            this.isCustomError = true;
            this.isLoading = false;
            this.errorMessage = 'Please, make sure you have admin access';
            this.form.reset();
            setTimeout(()=>{
              this.isCustomError = false;
            }, 4000)
          }
        }
      });
    }
  }
}
