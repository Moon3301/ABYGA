import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  dataType:any = ''
  private apiURL = 'http://172.174.162.231:3000/';
  listado = []
  

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any[]> {
    this.apiURL = 'http://172.174.162.231:3000/GetDataUsuario'
    return this.http.get<any[]>(this.apiURL);
  }

  agregarUsuario(usuario: any) {
    this.apiURL = 'http://172.174.162.231:3000/AddDataUsuario'
    return this.http.post(this.apiURL, usuario);
  }











}
