import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Proizvod } from '../models/proizvod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  private readonly API_URL = 'http://localhost:8083/proizvod/';

  dataChange: BehaviorSubject<Proizvod[]> = new BehaviorSubject<Proizvod[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllProizvod(): Observable<Proizvod[]> {
    this.httpClient.get<Proizvod[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' --> ' + error.message);
    });

    return this.dataChange.asObservable();
  }

  public addProizvod(proizvod: Proizvod): void {
    proizvod.id = 0;
    this.httpClient.post(this.API_URL, proizvod).subscribe();
  }

  public updateProizvod(proizvod: Proizvod): void {
    this.httpClient.put(this.API_URL, proizvod).subscribe();
  }

  public deleteProizvod(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
    console.log('Deleting Proizvod with ID: ' + id);
  }

}

