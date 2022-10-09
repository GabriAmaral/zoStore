import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';
import { convertFileToBase64, getFileFromUrl } from '../cadastro-produto/cadastro-produto.component';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: [
    './perfil-usuario.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class PerfilUsuarioComponent implements OnInit {
  model: any = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loadInfos(false)
  }

  loadInfos(atualizar: boolean) {
    this.authService.buscarUsuario(atualizar).then(user => {
      this.model = this.formBuilder.group({
        id: [user?.id],
        name: [user?.name, Validators.required],
        password: [user?.password, Validators.required],
        passwordConfirm: [user?.password, Validators.required],
        email: [user?.email, Validators.required],
        discord: user?.discord,
        foto: user?.foto
      });
    })
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

    if(this.fileToUpload == null && this.model.value.foto == "")
      this.fileToUpload = await getFileFromUrl('https://i.imgur.com/0UzV6qc.jpg', 'user?.jpg');

    convertFileToBase64(this.fileToUpload).then((result) => {
      this.model.value.foto = result;

      this.baseApi.post(environment.baseApi + "api/Usuario/Update", this.model.value).subscribe((res: any) => {
        if(res?.error) {
          this.toastr.error(res?.error.toString(), 'Ops');
  
          return
        }
  
        if(res) {
          this.toastr.success("Atualizacão feita com sucesso", "");
          this.loadInfos(true)
        }
      })
    })

    
  }

  fileToUpload: File | any = null;
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.fileToUpload = (target.files as FileList)[0];

    convertFileToBase64(this.fileToUpload).then((result) => {
      this.model.value.foto = result;
    })
  }
}
