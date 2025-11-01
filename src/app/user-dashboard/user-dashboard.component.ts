import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,ToastrModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  loading = false;
  searchTerm = '';
  error = '';
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.fetchUsers();
    console.log('hiii');
    
  }

  fetchUsers(): void {
    this.loading = true;
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.users = data;
          this.filteredUsers = data;
          this.loading = false;
          this.toastr.success('Users Found')
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }
}
