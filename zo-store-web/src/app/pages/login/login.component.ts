import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class LoginComponent implements OnInit {
  model: any = null;
  error: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { 
    this.model = this.formBuilder.group({
      name: [''],
      password: ['', Validators.required],
      email: ['', Validators.required],
      discord: '',
      foto: ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.baseApi.post(environment.baseApi + "api/Usuario/CheckLogin", this.model.value).subscribe((res: any) => {
      if(res?.error) {
        this.model.reset()
        this.toastr.error(res?.error.toString(), 'Ops');
        
        return
      }

      if(res) {
        this.authService.fazerLogin(res);
        this.router.navigateByUrl("/");
      }
    })
  }
}
