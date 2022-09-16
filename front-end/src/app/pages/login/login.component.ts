import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
    console.log(this.model.value)

    this.baseApi.post(environment.baseApi + "api/Usuario/CheckLogin", this.model.value).subscribe((res: any) => {
      console.log(res)

      if(res?.error) {
        return this.error = res?.error
      }

      if(res) {
        this.router.navigateByUrl("/")
      }
    })
  }
}
