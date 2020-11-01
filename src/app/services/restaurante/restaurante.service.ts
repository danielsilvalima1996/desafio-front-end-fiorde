import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/interfaces/restaurante.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private url: string = `${environment.api}/restaurante`;

  constructor(private http: HttpClient) { }

  public findAll(nome?: string): Observable<Array<Restaurante>> {
    return this.http.get(`${this.url}?nome=${nome}`) as Observable<Array<Restaurante>>;
  }

  public findAllList(): Observable<Array<Restaurante>> {
    return this.http.get(`${this.url}/list`) as Observable<Array<Restaurante>>;
  }

  public findById(id: number): Observable<Restaurante> {
    return this.http.get(`${this.url}/${id}`) as Observable<Restaurante>;
  }

  public createRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.post(`${this.url}`, restaurante) as Observable<Restaurante>;
  }

  public alterRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.put(`${this.url}`, restaurante) as Observable<Restaurante>;
  }

  public deleteRestauranteById(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
