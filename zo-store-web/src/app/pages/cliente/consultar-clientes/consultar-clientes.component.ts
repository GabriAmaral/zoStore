import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultar-clientes',
  templateUrl: './consultar-clientes.component.html',
  styleUrls: [
    './consultar-clientes.component.scss',
    '../../../shared/styles/default-form.scss'
  ]
})
export class ConsultarClientesComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'name', 'email', 'actions' ];
  clientes = [
    // {id: 1, nome: 'Hydrogen', valor: 1.0079, descricao: 'H'},
    // {id: 2,  nome: 'Helium',  valor: 4.0026, descricao: 'He'},
    // {id: 3,  nome: 'Lithium', valor: 6.941, descricao: 'Li'},
    // {id: 4,  nome: 'Beryllium', valor: 9.0122, descricao: 'Be'},
    // {id: 5,  nome: 'Boron', valor: 10.811, descricao: 'B'},
    // {id: 6,  nome: 'Carbon', valor: 12.0107, descricao: 'C'},
    // {id: 7,  nome: 'Nitrogen', valor: 14.0067, descricao: 'N'},
    // {id: 8,  nome: 'Oxygen', valor: 15.9994, descricao: 'O'},
    // {id: 9,  nome: 'Fluorine', valor: 18.9984, descricao: 'F'},
    // {id: 10, nome: 'Neon', valor: 20.1797, descricao: 'Ne'},
    // {id: 1,  nome: 'Hydrogen', valor: 1.0079, descricao: 'H'},
    // {id: 2,  nome: 'Helium', valor: 4.0026, descricao: 'He'},
    // {id: 3,  nome: 'Lithium', valor: 6.941, descricao: 'Li'},
    // {id: 4,  nome: 'Beryllium', valor: 9.0122, descricao: 'Be'},
    // {id: 5,  nome: 'Boron', valor: 10.811, descricao: 'B'},
    // {id: 6,  nome: 'Carbon', valor: 12.0107, descricao: 'C'},
    // {id: 7,  nome: 'Nitrogen', valor: 14.0067, descricao: 'N'},
    // {id: 8,  nome: 'Oxygen', valor: 15.9994, descricao: 'O'},
    // {id: 9,  nome: 'Fluorine', valor: 18.9984, descricao: 'F'},
    // {id: 10, nome: 'Neon', valor: 20.1797, descricao: 'Ne'},
  ]

  dataSource = new MatTableDataSource(this.clientes);

  constructor(
    private baseApi: BaseApiService
  ) {
    this.recomporClientes()
  }

  recomporClientes() {
    this.baseApi.get(environment.baseApi + "api/Usuario/GetClientes").subscribe((res: any) => {
      this.clientes = res
      this.dataSource = new MatTableDataSource(this.clientes);
    })
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluirProduto(produto: any) {
    this.baseApi.delete(environment.baseApi + "api/Produto/DeletarProduto?id=" + produto.id).subscribe((res: any) => {
      this.recomporClientes()
    })
  }

  editarProduto(produto: any) {
    console.log(produto)
  }

}
