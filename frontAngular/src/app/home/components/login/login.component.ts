import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string = '';


  constructor(private fb: FormBuilder, private auth: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
     correo: ['', [Validators.required, Validators.email]],
     password: ['', Validators.required]
   });
  }


    onSubmit() {
    if (this.loginForm.invalid) return;
    const { correo, password } = this.loginForm.value;
    this.auth.login(correo!, password!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario)); 
        this.auth.loggedIn.next(true); 
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert(err.error.error)
    });
  }


}
