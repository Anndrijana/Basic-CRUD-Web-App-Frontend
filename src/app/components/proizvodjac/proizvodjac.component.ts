import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';
import { MatDialog } from '@angular/material/dialog';
import { ProizvodjacDialogComponent } from '../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];
  dataSource: MatTableDataSource<Proizvodjac>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public proizvodjacService: ProizvodjacService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.proizvodjacService.getAllProizvodjac().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

public openDialog(flag: number, id?: number, naziv?: string, adresa?: string, kontakt?: string) {
  const dialogRef = this.dialog.open(ProizvodjacDialogComponent,
     { data: { id, naziv, adresa, kontakt } });

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

