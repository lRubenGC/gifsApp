import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKEY: string = "I2wHH1WmOleLH4vyXSeW9IIwtBhHvZlx";
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }
  
  constructor( private http: HttpClient ) {}

  agregarGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes( query ) && query.length != 0) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=I2wHH1WmOleLH4vyXSeW9IIwtBhHvZlx&q=dragon ball z&limit=10')
          .subscribe( (resp: any) => {
            console.log(resp.data);
          });

  }

}
