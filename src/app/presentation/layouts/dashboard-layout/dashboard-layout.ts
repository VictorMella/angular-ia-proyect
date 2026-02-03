import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuItem } from '../../components/sidebar-menu-item/sidebar-menu-item';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, SidebarMenuItem],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  public routes = routes[0].children?.filter((route) => route.data);
}
