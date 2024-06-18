import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  login() {
    const credentials = { username: this.username, password: this.password, rememberMe: this.rememberMe };
    this.authService.login(credentials).subscribe(
      response => {
        console.log('Login successful', response);      
        this.snackBar.open('Connexion réussie !', 'Fermer', {duration: 5000,});
        localStorage.setItem('token', response.token);        
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
        this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {duration: 5000,});
      }
    );
  }
}
