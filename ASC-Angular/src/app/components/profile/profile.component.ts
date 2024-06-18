import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getUserProfile();
    if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  getUserProfile(): void {
    this.authService.getProfile().subscribe(
      (data) => {
        this.user = data.user;
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
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


  deleteProfile(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.authService.deleteProfile().subscribe(
        () => {
          this.snackBar.open('Compte supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/register']);
        },
        (error) => {
          this.snackBar.open('Erreur lors de la suppression du compte', 'Fermer', {
            duration: 3000
          });
          console.error(error);
        }
      );
    }
  }
}
