import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { Racun } from 'src/app/models/racun';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { MatDialog } from '@angular/material/dialog';
import { Proizvod } from 'src/app/models/proizvod';
import { StavkaRacunaDialogComponent } from '../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnChanges {
  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'racun', 'proizvod', 'actions'];
  dataSource: MatTableDataSource<StavkaRacuna>;

  @Input() selektovanRacun: Racun;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public stavkaRacunaService: StavkaRacunaService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.selektovanRacun.id) {
      debugger;
      this.loadData();
    }
  }

  public loadData() {
    this.stavkaRacunaService.getStavkeZaRacun(this.selektovanRacun.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'proizvod' ? currentTerm + data.proizvod.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'proizvod': return data.proizvod.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  public openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: number,
    cena?: number, racun?: Racun, proizvod?: Proizvod) {
const dialogRef = this.dialog.open(StavkaRacunaDialogComponent, {
data: {
i: id, id, redniBroj, kolicina, jedinicaMere,
cena, racun, proizvod
}
});
dialogRef.componentInstance.flag = flag;
if (flag === 1) {
dialogRef.componentInstance.data.racun = this.selektovanRacun;
}

dialogRef.afterClosed().subscribe(result => {
if (result === 1) {
this.loadData();
}
});
}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
