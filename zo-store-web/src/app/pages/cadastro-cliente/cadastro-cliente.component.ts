import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cyrb53 } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';
import { convertFileToBase64, getFileFromUrl } from '../cadastro-produto/cadastro-produto.component';
@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: [
    './cadastro-cliente.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class CadastroClienteComponent implements OnInit {
  model: any = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.model = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      email: ['', Validators.required],
      discord: '',
      foto: ''
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    if(this.model.value.password != this.model.value.passwordConfirm) {
      this.model.get("passwordConfirm").setValue("");
      this.model.get("password").setValue("");

      // this.notify.error("Senhas estavam diferentes", { timer: 5000 })
      return
    }

    this.model.value.password = cyrb53(this.model.value.password)
    this.model.value.passwordConfirm = cyrb53(this.model.value.passwordConfirm)

    if(this.fileToUpload == null)
      this.fileToUpload = await getFileFromUrl('https://i.imgur.com/0UzV6qc.jpg', 'user.jpg');

    convertFileToBase64(this.fileToUpload).then((result) => {
      this.model.value.foto = result;

      this.baseApi.post(environment.baseApi + "api/Usuario/Post", this.model.value).subscribe((res: any) => {
        if(res?.error) {
          this.toastr.error(res?.error.toString(), 'Ops');
  
          return
        }
  
        if(res) {
          this.toastr.success("Cadastro realizado com sucesso", "");
          this.router.navigateByUrl("/login")
        }
      })
    })

    
  }

  fileToUpload: File | any = null;
  handleFileInput(event: Event) {
    const target= event.target as HTMLInputElement;

    this.fileToUpload = (target.files as FileList)[0];
  }
}
