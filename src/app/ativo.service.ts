import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Ativo } from './ativo';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class AtivoService {
  url = 'https://api.hgbrasil.com/finance/stock_price?format=json-cors&key=5de3b672&symbol=';

  constructor(private http:HttpClient) { }

  getAtivoByCodigo(codigo : string): Observable<Ativo>{
    const apiurl = `${this.url}${codigo}`;
    return this.http.get<Ativo>(apiurl);
  }
}
