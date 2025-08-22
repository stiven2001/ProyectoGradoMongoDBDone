import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener perfil del usuario
  obtenerMiPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/mi-perfil`, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar datos del usuario
  actualizarMiPerfil(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/mi-perfil/actualizar`, usuario, {
      headers: this.getAuthHeaders()
    });
  }

  // Cambiar contraseña
  cambiarPassword(contraseña: string): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.baseUrl}/mi-perfil/password`, { contraseña }, {
      headers: this.getAuthHeaders()
    });
  }

}
