import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, cyrb53 } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';
import { convertFileToBase64, getFileFromUrl } from '../produto/cadastro-produto/cadastro-produto.component';
@Component({
  selector: 'app-produtos-usuario',
  templateUrl: './produtos-usuario.component.html',
  styleUrls: [
    './produtos-usuario.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class ProdutosUsuarioComponent implements OnInit {
  produtos: any = []

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
      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutosCliente?idCliente=" + user.id).subscribe((res: any) => {
        console.log(res)

        this.produtos = res
      })
    })
  }

  ngOnInit() {
  }

  download(prod: any) {
    window.open(prod.cdn, '_blank')
  }
}
