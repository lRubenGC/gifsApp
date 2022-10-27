import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKEY: string = "I2wHH1WmOleLH4vyXSeW9IIwtBhHvZlx";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }
  
  constructor( private http: HttpClient ) {

    if ( localStorage.getItem('historial') ) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    //Tambien se puede hacer de la siguiente manera:
    //this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //Hace la misma comprobacion de si existe el item, pero sin usar un If
    //Ejemplo para mostrar los resultados del historial de otra manera
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  agregarGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes( query ) && query.length != 0) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
  
    localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=I2wHH1WmOleLH4vyXSeW9IIwtBhHvZlx&q=${ query }&limit=10`)
          .subscribe( ( resp ) => {
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
          });

  }

}
