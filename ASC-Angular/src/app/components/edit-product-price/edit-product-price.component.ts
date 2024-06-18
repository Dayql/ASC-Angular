import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-edit-product-price',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './edit-product-price.component.html',
  styleUrls: ['./edit-product-price.component.css']
})
export class EditProductPriceComponent implements OnInit {
  newPrice: number | null = null;
  productId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
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

  updateProduct(): void {
    if (this.productId && this.newPrice !== null) {
      const updateData = { prix: this.newPrice };
      this.productService.updateProduct(this.productId, updateData).subscribe(
        response => {
          console.log('Product price update successful', response);
          this.snackBar.open('Prix du produit mis à jour avec succès !', 'Fermer', {
            duration: 5000,
          });
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Product price update failed', error);
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
