import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router:Router,private auth:AuthService){

  }
  onLogout() {
    this.auth.setIsAuthenticated(false);
    this.router.navigate(['login']);
  }
}
