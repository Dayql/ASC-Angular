import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  searchQuery: string = '';
  products: any[] = [];
  selectedProduct: any = null;
  productMovements: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar, private productService: ProductService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
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

  searchProducts(): void {
    this.productService.searchProducts(this.searchQuery).subscribe(
      (products) => {
        this.products = products;
        if (products.length === 0) {
          this.snackBar.open('Aucun produit trouvé', 'Fermer', {
            duration: 3000
          });
        } else {
          this.selectedProduct = products[0]; // Supposons que la recherche renvoie une liste de produits
          this.loadProductMovements();
        }
      },
      (error) => {
        console.error('Erreur lors de la recherche des produits', error);
        this.snackBar.open('Erreur lors de la recherche des produits', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  loadProductMovements(page: number = 1): void {
    if (!this.selectedProduct) {
      return;
    }

    this.productService.getProductMovements(this.selectedProduct.id, page).subscribe(
      response => {
        this.productMovements = response.data;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
      },
      error => {
        console.error('Erreur lors du chargement des mouvements de produit', error);
        this.snackBar.open('Erreur lors du chargement des mouvements de produit', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  goToPage(page: number): void {
    this.loadProductMovements(page);
  }
}
