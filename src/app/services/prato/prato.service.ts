import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prato } from 'src/app/interfaces/prato.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PratoService {

  private url: string = `${environment.api}/restaurante`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Prato>> {
    return this.http.get(`${this.url}`) as Observable<Array<Prato>>;
  }

  public findById(id: number): Observable<Prato> {
    return this.http.get(`${this.url}/${id}`) as Observable<Prato>;
  }

  public createPrato(prato: Prato): Observable<Prato> {
    return this.http.post(`${this.url}`, prato) as Observable<Prato>;
  }

  public alterPrato(prato: Prato): Observable<Prato> {
    return this.http.put(`${this.url}`, prato) as Observable<Prato>;
  }

  public deletePratoById(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
