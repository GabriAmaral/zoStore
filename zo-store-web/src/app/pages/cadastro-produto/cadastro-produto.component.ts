import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: [
    './cadastro-produto.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class CadastroProdutoComponent implements OnInit {
  model: any = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.model = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      imagem: [''],
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    if(this.fileToUpload == null)
      this.fileToUpload = await getFileFromUrl('https://i.imgur.com/0GOdr0r.png', 'noimage.png');

    convertFileToBase64(this.fileToUpload).then((result) => {
      this.model.value.imagem = result;

      this.baseApi.post(environment.baseApi + "api/Produto/CriarProduto", this.model.value).subscribe((res: any) => {
        if(res?.error) {
          this.toastr.error(res?.error.toString(), 'Ops');

          return
        }
  
        if(res) {
          this.toastr.success("Cadastro realizado com sucesso", "");
          this.router.navigateByUrl("/gerenciar/consultar-produtos")
        }
      })
    });
  }

  fileToUpload: File | any = null;
  handleFileInput(event: Event) {
    const target= event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
  }
}

export function convertFileToBase64(file: File): Promise<string> {
  var reader: any = new FileReader();
  reader.readAsDataURL(file);

  let promise = new Promise<string>((response, reject) => {
    reader.onloadend = () => {
      response(reader.result.toString());
    };
  });

  return promise;
}

export async function getFileFromUrl(url: string, name: string, defaultType = 'image/jpeg'){
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], name, {
    type: data.type || defaultType,
  });
}