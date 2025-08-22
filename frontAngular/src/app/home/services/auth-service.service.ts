import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

    private baseUrl = 'http://localhost:3000/api/auth';


  constructor(private http: HttpClient) { }

   login(correo: string, password: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, { correo, contraseña: password }).pipe(
    tap((res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario)); // ✅ JSON.stringify
      this.loggedIn.next(true);
    })
  );
}


  signup(nombre: string, correo: string, password: string, edad: number, rol: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { nombre, correo, contraseña: password, edad, rol });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
    
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  this.loggedIn.next(false); // actualizar estado
}

checkToken() {
  const token = localStorage.getItem('token');
  this.loggedIn.next(!!token); // verifica si hay token al iniciar la app
}

getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}


}
