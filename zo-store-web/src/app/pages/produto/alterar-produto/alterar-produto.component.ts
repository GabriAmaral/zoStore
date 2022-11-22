import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.component.html',
  styleUrls: [
    './alterar-produto.component.scss',
    '../../../shared/styles/default-form.scss'
  ]
})
export class AlterarProdutoComponent implements OnInit {
  model: any = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      let idProd = params['id']

      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProduto?id=" + idProd).subscribe((res: any) => {
        this.populateModel(res)
      })
    });
  }

  populateModel(produto: any) {
    this.model = this.formBuilder.group({
      id: [produto?.id, Validators.required],
      nome: [produto?.nome, Validators.required],
      descricao: [produto?.descricao, Validators.required],
      valor: [produto?.valor, Validators.required],
      imagem: [produto?.imagem],
      cdn: [produto?.cdn, Validators.required],
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    this.baseApi.post(environment.baseApi + "api/Produto/Update", this.model.value).subscribe((res: any) => {
      if(res?.error) {
        this.toastr.error(res?.error.toString(), 'Ops');

        return
      }

      if(res) {
        this.toastr.success("Atualização realizado com sucesso", "");
        this.router.navigateByUrl("/gerenciar/consultar-produtos")
      }
    })
  }

  fileToUpload: File | any = null;
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.fileToUpload = (target.files as FileList)[0];

    convertFileToBase64(this.fileToUpload).then((result) => {
      this.model.value.imagem = result;
    })
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