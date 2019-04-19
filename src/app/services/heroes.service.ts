import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Heroe from '../models/Heroe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url: string = 'https://heroesapp-6bbf6.firebaseio.com/heroes.json';
  url_min: string = 'https://heroesapp-6bbf6.firebaseio.com/heroes/';

  constructor(private http: HttpClient) { }

  postHeroe(heroe: Heroe): Observable<Object> {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.url, body, { headers })
      .pipe(map(res => res));
  }

  putHeroe(heroe: Heroe, key: string): Observable<Object> {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${this.url_min}${key}.json`;

    return this.http.put(url, body, { headers })
      .pipe(map(res => res));
  }

  getHeroe(key: string): Observable<any> {
    let url = `${this.url_min}${key}.json`;
    return this.http.get(url)
      .pipe(map(res => res));
  }

  getHeroes(): Observable<any> {
    return this.http.get(this.url)
      .pipe(map(res => res));
  }

  deleteHeroe(key: string): Observable<Object> {
    let url = `${this.url_min}${key}.json`;
    return this.http.delete(url)
      .pipe(map(res => res));
  }

}
