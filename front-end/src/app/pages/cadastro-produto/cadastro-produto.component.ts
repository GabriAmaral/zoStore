import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
  model = null
  error = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router
  ) {
    this.model = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      imagem: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    convertFileToBase64(this.fileToUpload).then((result) => {
      this.model.value.imagem = result;

      this.baseApi.post(environment.baseApi + "api/Produto/CriarProduto", this.model.value).subscribe((res: any) => {
        if(res?.error) {
          return this.error = res?.error
        }
  
        if(res) {
          this.router.navigateByUrl("/produtos")
        }
      })
    });
  }

  fileToUpload: File | null = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}

export function convertFileToBase64(file: File): Promise<string> {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  let promise = new Promise<string>((response, reject) => {
    reader.onloadend = () => {
      response(reader.result.toString());
    };
  });

  return promise;
}