import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = null;
  error = null;

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private authService: AuthService
  ) { 
    this.model = this.formBuilder.group({
      name: [''],
      password: ['', Validators.required],
      email: ['', Validators.required],
      discord: '',
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.baseApi.post(environment.baseApi + "api/Usuario/CheckLogin", this.model.value).subscribe((res: any) => {
      if(res?.error) {
        return this.error = res?.error
      }

      if(res) {
        this.authService.fazerLogin(res);
        this.router.navigateByUrl("/");
      }
    })
  }
}
