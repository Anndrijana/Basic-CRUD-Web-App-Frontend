import { Proizvodjac } from './../../models/proizvodjac';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Proizvod } from 'src/app/models/proizvod';
import { MatPaginator } from '@angular/material/paginator';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { MatDialog } from '@angular/material/dialog';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource: MatTableDataSource<Proizvod>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public proizvodService: ProizvodService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
   this.proizvodService.getAllProizvod().subscribe(data => {
     this.dataSource = new MatTableDataSource(data);

     // pretraga po nazivu ugnježdenog objekta
     this.dataSource.filterPredicate = (data, filter: string) => {
       const accumulator = (currentTerm, key) => {
         return key === 'proizvodjac' ? currentTerm + data.proizvodjac.naziv : currentTerm + data[key];
       };
       const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
       const transformedFilter = filter.trim().toLowerCase();
       return dataStr.indexOf(transformedFilter) !== -1;
     };

      // sortiranje po nazivu ugnježdenog objekta
     this.dataSource.sortingDataAccessor = (data, property) => {
       switch (property) {
         case 'proizvodjac': return data.proizvodjac.naziv.toLocaleLowerCase();
         default: return data[property];
       }
     };

     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   });

 }

 public openDialog(flag: number, id?: number, naziv?: string, proizvodjac?: Proizvodjac) {
  const dialogRef = this.dialog.open(ProizvodDialogComponent,
     { data: { id, naziv, proizvodjac } });

  dialogRef.componentInstance.flag = flag;

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.loadData();
    }
  });
}

  applyFilter(filterValue: string){
   filterValue = filterValue.trim();
   filterValue = filterValue.toLocaleLowerCase();
   this.dataSource.filter = filterValue;
 }
}
