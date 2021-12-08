import { Proizvodjac } from './../../../models/proizvodjac';
import { ProizvodjacService } from './../../../services/proizvodjac.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Proizvodjac,
              public proizvodjacService: ProizvodjacService
  ) { }

  ngOnInit() {
  }

  public add(): void{
    this.proizvodjacService.addProizvodjac(this.data);
    this.snackBar.open('Uspešno dodat proizvođač: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.proizvodjacService.updateProizvodjac(this.data);
    this.snackBar.open('Uspešno modifikovan proizvodjac: ' + this.data.naziv, 'U redu', {
      duration: 1500
    });
  }

  public delete(): void{
    console.log('brisem proizvodjaca sa id: ' + this.data.id);
    this.proizvodjacService.deleteProizvodjac(this.data.id);
    this.snackBar.open('Uspešno obrisan proizvođač: ' + this.data.naziv, 'U redu', {
      duration: 1500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {
      duration: 500
    });
  }
}
