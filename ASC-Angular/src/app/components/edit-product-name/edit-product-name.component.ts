// edit-product-name.component.ts
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
  selector: 'app-edit-product-name',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './edit-product-name.component.html',
  styleUrls: ['./edit-product-name.component.css']
})
export class EditProductNameComponent implements OnInit {
  newName: string = '';
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
    if (this.productId) {
      const updateData = { nom: this.newName };
      this.productService.updateProduct(this.productId, updateData).subscribe(
        response => {
          console.log('Product name update successful', response);
          this.snackBar.open('Nom du produit mis à jour avec succès !', 'Fermer', {
            duration: 5000,
          });
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Product name update failed', error);
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
