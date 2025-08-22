import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/shared/interfaces/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
   usuario: Usuario = { nombre: '', correo: '', edad: 0 };

  constructor(private auth: AuthServiceService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obtenerMiPerfil().subscribe(
      data => this.usuario = data,
      err => console.error(err)
    );
  }

  actualizarPerfil() {
    this.usuarioService.actualizarMiPerfil(this.usuario).subscribe(
      data => alert('Perfil actualizado correctamente'),
      err => console.error(err)
    );
  }

  cambiarPassword(nuevaPassword: string) {
    this.usuarioService.cambiarPassword(nuevaPassword).subscribe(
      res => alert(res.mensaje),
      err => console.error(err)
    );
  }

}
