import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StockMovementService } from '../../services/mouvementStock/stock-movement.service'
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {
  productId: number | null = null;
  type: string = '';
  quantity: number | null = null;
  reason: string = '';
  isAdmin: boolean = false;
  date: string = '';

  constructor(
    private stockMovementService: StockMovementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.productId = parseInt(this.getProductId() || '', 10);
    if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  manageStock(): void {
    if (this.productId && this.type && this.quantity !== null && this.reason) {
      const stockData = {
        produit_id: this.productId,
        type: this.type,
        quantite: this.quantity,
        raison: this.reason,
        date: this.date
      };
      this.stockMovementService.manageStock(this.productId, stockData).subscribe(
        response => {
          console.log('Stock movement successful', response);
          this.snackBar.open('Mouvement de stock enregistré avec succès !', 'Fermer', {
            duration: 5000,
          });
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Stock movement failed', error);
          this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {
            duration: 5000,
          });
        }
      );
    } 
  }

  getProductId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}