import { Component, OnInit } from '@angular/core';
import { StockMovementService } from '../../services/mouvementStock/stock-movement.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  movements: any[] = [];
  isAdmin: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private stockMovementService: StockMovementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
    this.loadMovements();
  }


  loadMovements(): void {
    this.stockMovementService.getAllMovements(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.movements = data.movements;
        this.totalPages = data.totalPages;
      },
      (error: any) => {
        console.error('Error fetching stock movements:', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovements();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovements();
    }
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
