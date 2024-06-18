import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-username',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.css']
})
export class EditUsernameComponent {
  newUsername: string = '';
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  updateProfile(): void {
    const userData = { username: this.newUsername };
    this.authService.updateProfile(userData).subscribe(
      response => {
        console.log('Username update successful', response);
        this.snackBar.open('Nom d\'utilisateur mis à jour avec succès !', 'Fermer', {
          duration: 5000,
        });
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Username update failed', error);
        this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {
          duration: 5000,
        });
      }
    );
  }

  logout(): void {
    try {
      this.authService.logout();
      console.log('Déconnexion réussie');
      this.snackBar.open('Déconnexion réussie', 'Fermer', {
        duration: 3000
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      this.snackBar.open('Erreur lors de la déconnexion', 'Fermer', {
        duration: 3000
      });
    }
  }


}
