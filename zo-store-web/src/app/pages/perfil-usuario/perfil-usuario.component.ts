import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, cyrb53 } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';
import { convertFileToBase64, getFileFromUrl } from '../produto/cadastro-produto/cadastro-produto.component';
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
  foto: any = null

  alterarSenha = false

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
      this.foto = user?.foto

      this.model = this.formBuilder.group({
        id: [user?.id],
        name: [user?.name, Validators.required],
        password: [user?.password],
        passwordConfirm: [''],
        passwordBack: [''],
        email: [user?.email, Validators.required],
        access: user?.access,
        discord: user?.discord,
        foto: user?.foto
      });
    })
  }

  ngOnInit() {
  }

  async onSubmit() {
    let valueModel = { ... this.model.value };

    if(this.alterarSenha) {
      if(valueModel?.password == '' || valueModel?.password == null || valueModel?.passwordConfirm == '' || valueModel?.passwordConfirm == null || valueModel?.passwordBack == '' || valueModel?.passwordBack == null) {
        this.toastr.error("Preencha todas as senhas", "");
        return
      }

      let passwordBackNew = cyrb53(valueModel.password)

      valueModel.password = cyrb53(this.model.value.passwordBack)
      valueModel.passwordConfirm = cyrb53(this.model.value.passwordConfirm)

      delete valueModel.passwordBack;

      let requestVerifyPassword = this.baseApi.post(environment.baseApi + "api/Usuario/CheckPasswordAlter", valueModel).toPromise()
      let verifyPassword = await Promise.all([requestVerifyPassword]);

      if(!verifyPassword[0]) {
        this.model.get("passwordBack").setValue("");
        this.toastr.error("A senha anterior está errada", "");

        return 
      }

      valueModel.password = passwordBackNew
        
      if(valueModel.password != valueModel.passwordConfirm) {
        this.model.get("passwordConfirm").setValue("");
        this.model.get("password").setValue("");

        this.toastr.error("As senhas estavam diferentes", "");
        return
      }
    } else {
      delete valueModel.passwordBack;
    }

    if(this.foto != valueModel?.foto)
    valueModel.foto = this.foto

    this.baseApi.post(environment.baseApi + "api/Usuario/Update", valueModel).subscribe((res: any) => {
      if(res?.error) {
        this.toastr.error(res?.error.toString(), 'Ops');

        return
      }

      if(res) {
        this.alterarSenha = false

        this.toastr.success("Atualizacão feita com sucesso", "");
        this.loadInfos(true)
      }
    })
  }

  fileToUpload: File | any = null;
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.fileToUpload = (target.files as FileList)[0];

    convertFileToBase64(this.fileToUpload).then((result) => {
      this.foto = result
      this.model.value.foto = result;
    })
  }
}
