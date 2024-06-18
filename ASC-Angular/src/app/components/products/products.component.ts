import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
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
        this.selectedProduct = products[0] || null;
        if (this.selectedProduct) {
          this.loadProductMovements(this.selectedProduct.produit_id);
        } else {
          this.snackBar.open('Aucun produit trouvé', 'Fermer', {
            duration: 3000
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la recherche des produits', error);
        this.snackBar.open('Erreur : ' + (error?.error?.message), 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  loadProductMovements(productId: number): void {
    this.productService.getProductMovements(productId, this.currentPage).subscribe(
      (response) => {
        this.productMovements = response.movements;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Erreur lors du chargement des mouvements de produit', error);
        this.snackBar.open('Erreur lors du chargement des mouvements de produit', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.selectedProduct) {
        this.loadProductMovements(this.selectedProduct.produit_id);
      }
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.selectedProduct) {
        this.loadProductMovements(this.selectedProduct.produit_id);
      }
    }
  }



  editField(field: string): void {
    const newValue = prompt(`Modifier ${field}:`, this.selectedProduct[field]);
    if (newValue !== null && newValue !== this.selectedProduct[field]) {
      this.selectedProduct[field] = newValue;
      this.updateProduct();
    }
  }

  updateProduct(): void {
    this.productService.updateProduct(this.selectedProduct.produit_id, this.selectedProduct).subscribe(
      () => {
        this.snackBar.open('Produit mis à jour avec succès', 'Fermer', {
          duration: 3000
        });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
        this.snackBar.open('Erreur lors de la mise à jour du produit', 'Fermer', {
          duration: 3000
        });
      }
    );
  }


}


