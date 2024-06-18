import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};
  isAdmin: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  currentUser: any = {};

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
    if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  loadUsers(page: number = 1): void {
    this.authService.getAllUsers(page).subscribe(
      (response) => {
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
        this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {
          duration: 5000,
        });
      }
    );
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
  }

  updateUser(userId: string, userData: any): void {
    this.authService.updateUser(userId, userData).subscribe(
      () => {
        this.loadUsers(this.currentPage);
        this.snackBar.open('Utilisateur mis à jour avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {
          duration: 5000,
        });
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    );
  }

  deleteUser(userId: string): void {
    this.authService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers(this.currentPage);
        this.snackBar.open('Utilisateur supprimé avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {
          duration: 5000,
        });
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadUsers(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadUsers(this.currentPage - 1);
    }
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
