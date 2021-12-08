import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Racun } from 'src/app/models/racun';
import { MatPaginator } from '@angular/material/paginator';
import { RacunService } from 'src/app/services/racun.service';
import { MatDialog } from '@angular/material/dialog';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {

  displayedColumns = ['id', 'datum', 'nacinPlacanja', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  selektovanRacun: Racun;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public racunService: RacunService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.racunService.getAllRacun().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, id?: number, datum?: Date, nacinPlacanja?: string) {
    const dialogRef = this.dialog.open(RacunDialogComponent,
       { data: { id, datum, nacinPlacanja } });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1){
         this.loadData();
      }

    });
  }

  selectRow(row: any){
   this.selektovanRacun = row;
  }

  applyFilter(filterValue: string){
   filterValue = filterValue.trim();
   filterValue = filterValue.toLocaleLowerCase();
   this.dataSource.filter = filterValue;
 }
}
