import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AtivoService } from '../ativo.service';
import { GridDataSource, GridItem } from './grid-datasource';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GridItem>;
  dataSource: GridDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Codigo', 'CotacaoAtual', 'NumeroDeCotas', 'PrecoMedio', 'Variacao'];
  ativos = ['ABEV3', 'PETR4', 'BBSE3', 'ITSA4'];

  data:any[] = [];

  constructor(private ativoService:AtivoService) {
    this.dataSource = new GridDataSource();
    //private ativoService : AtivoService;
  }

  ngOnInit(){
    this.loadAllAtivos(this.ativos);
   this.dataSource.data = this.data;
    console.log(this.dataSource);
  }

  ngOnChanges(){
    this.loadAllAtivos(this.ativos);
    this.dataSource.data = this.data;
    console.log(this.dataSource);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  loadAllAtivos(codigo:string[]){
    this.data = [];
    codigo.forEach(element => {
      this.ativoService.getAtivoByCodigo(element).subscribe((response)=>{
        //console.log(response.results[element].price);
        response.results[element].numeroCotas = Math.floor(Math.random() * 100);
        response.results[element].precoMedio = String((Math.random() * 10).toFixed(2));
        response.results[element].variacao = (Math.random() * 10).toFixed(2);
        this.data.push(response.results[element]);
        //console.log(this.data);
      })
    });
  }
}
