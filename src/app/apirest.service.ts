import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  dataType:any = ''
  private apiURL = 'https://172.174.162.231:443/';
  listado = []
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    this.apiURL = 'https://172.174.162.231:443/GetDataUsuarios'
    return this.http.get<any[]>(this.apiURL);
  }

  agregarUsuario(usuario: any) {
    this.apiURL = 'https://172.174.162.231:443/AddDataUsuario'
    return this.http.post(this.apiURL, usuario);
  }

  pagarWebpay(data:any) {
    return this.http.post('http://localhost:3000/PagarWebPay', data);
  }





  
}
