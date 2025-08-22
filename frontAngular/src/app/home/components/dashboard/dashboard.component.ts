import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { UsuarioService } from '../../services/usuario.service';
import { AdminService } from '../../services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  usuarios: any[] = [];
  roles: any[] = [];
  usuario: any;
  totalUsuarios: number = 0;
  actividades: any[] = [];
  nuevoPermiso: string = '';

   crearUsuarioForm!: FormGroup;

  constructor(private authService: AuthServiceService,  private usuarioService: UsuarioService, private AdminService: AdminService, private modalService: NgbModal, private fb: FormBuilder,) { }

  ngOnInit() {
        this.crearUsuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      rol: ['', Validators.required],
    });
    // Obtener roles desde backend
    this.AdminService.obtenerRoles().subscribe(data => this.roles = data);


        // obtenemos el usuario del servicio
    this.usuario = this.authService.getUsuario();

      // Obtener usuarios del backend
    this.AdminService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.totalUsuarios = usuarios.length;
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );

    // Obtener actividades recientes
    if (this.usuario.rol.permisos.includes('ver_reportes')) {
      this.AdminService.obtenerReportes().subscribe(
        (data) => this.actividades = data,
        (error) => console.error('Error al cargar reportes', error)
      );
    }
  

  }

    abrirModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  
  abrirModalPermisos(content: any) {
    this.nuevoPermiso = '';
    this.modalService.open(content, { size: 'lg' });
  }



  eliminarUsuario(id: string) {
    this.AdminService.eliminarUsuario(id).subscribe(
      () => this.usuarios = this.usuarios.filter(u => u._id !== id),
      err => console.error(err)
    );
  }

  crearUsuario(modal: any) {
    if (this.crearUsuarioForm.valid) {
      this.AdminService.crearUsuario(this.crearUsuarioForm.value).subscribe({
        next: (usuario) => {
          console.log('Usuario creado', usuario);
          modal.close();
          // actualizar lista de usuarios si tienes tabla
          this.obtenerUsuarios();
        },
        error: (err) => console.error(err)
      });
    }
  }

  obtenerUsuarios() {
     this.AdminService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.totalUsuarios = usuarios.length;
        this.usuarios = usuarios;
      },);
  }

  agregarPermiso(modal: any) {
  if (!this.nuevoPermiso) return;

    // No duplicar permisos
    if (!this.usuario.rol.permisos.includes(this.nuevoPermiso)) {
      this.usuario.rol.permisos.push(this.nuevoPermiso);

      // Llamada al backend para actualizar los permisos
      this.AdminService.asignarPermisos(this.usuario.rol._id, this.usuario.rol.permisos)
        .subscribe({
          next: (rolActualizado) => {
            console.log('Permiso agregado', rolActualizado);
            modal.close();
          },
          error: (err) => console.error(err)
        });
    }
  }

}
