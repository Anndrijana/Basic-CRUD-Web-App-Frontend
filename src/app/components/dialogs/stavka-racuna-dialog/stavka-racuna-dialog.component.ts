import { Component, OnInit, Inject } from '@angular/core';
import { Proizvod } from 'src/app/models/proizvod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit {
  proizvodi: Proizvod[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StavkaRacuna,
              public stavkaRacunaService: StavkaRacunaService,
              public proizvodService: ProizvodService
  ) { }


  ngOnInit() {
    this.proizvodService.getAllProizvod().subscribe(proizvodi =>
      this.proizvodi = proizvodi
    );
  }

  public add(): void {
    this.data.id = -1;
    this.stavkaRacunaService.addStavkaRacuna(this.data);
    this.snackBar.open('Uspešno dodata stavka računa', 'U redu', { duration: 2500 });
  }

  public update(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data);
    this.snackBar.open('Uspešno modifikovana stavku računa', 'U redu', { duration: 2500 });
  }

  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id);
    this.snackBar.open('Uspešno obrisana stavka računa', 'U redu', { duration: 2000 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 1000 });
  }

  compareTo(a, b) {
    return a.id === b.id;
  }
}
