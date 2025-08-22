import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/roles';

   constructor(private http: HttpClient) {}

   private getAuthHeaders(): HttpHeaders {
       const token = localStorage.getItem('token');
       return new HttpHeaders({
         'Authorization': `Bearer ${token}`
       });
     }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obtenerUsuarios`, {
      headers: this.getAuthHeaders()
    });
  }

  obtenerReportes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reportes`, {
      headers: this.getAuthHeaders()
    });
  }

  // Roles
  obtenerRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obtenerRoles`, {
      headers: this.getAuthHeaders()
    });
  }

  // Asignar permisos a un rol
  asignarPermisos(idRol: string, permisos: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${idRol}/permisos`, { permisos }, {
      headers: this.getAuthHeaders()
    });
  }

   // Eliminar un usuario por su ID
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Opcional: crear usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, usuario, {
      headers: this.getAuthHeaders()
    });
  }
}
