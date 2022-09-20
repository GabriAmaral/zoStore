import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {
  model = null
  error = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router
  ) {
    this.model = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      email: ['', Validators.required],
      discord: '',
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.model.value.password != this.model.value.passwordConfirm) {
      this.model.get("passwordConfirm").setValue("");
      this.model.get("password").setValue("");

      return this.error = "Senhas estavam diferentes"
    }

    this.baseApi.post(environment.baseApi + "api/Usuario/Post", this.model.value).subscribe((res: any) => {
      if(res?.error) {
        return this.error = res?.error
      }

      if(res) {
        this.router.navigateByUrl("/login")
      }
    })
  }
}
