import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserRole: 'Admin' | 'User' | null = null;

  constructor(private router: Router) {}

  private user = new BehaviorSubject<{ username: string, role: string } | null>(null);
  user$ = this.user.asObservable();

  login(username: string, role: string) {
    this.user.next({ username, role });
    localStorage.setItem('userRole', role);
    localStorage.setItem('name', username);


    if(localStorage.getItem('userRole') == "Admin"){
      this.router.navigate(['/form-builder']);
    }else{
    this.router.navigate(['/form-management']);
    }
  }


  logout() {
    this.currentUserRole = null;
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }

  getUserRole(): 'Admin' | 'User' | null {
    return this.currentUserRole || (localStorage.getItem('userRole') as 'Admin' | 'User');
  }
  getLoginDetails(){
    return
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
}
