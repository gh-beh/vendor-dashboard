import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MembersComponent } from '../../members/members.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { RewardsComponent } from '../../rewards/rewards.component';
import { LoginComponent } from '../../login/login.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'member-listing',   component: MembersComponent },
    { path: 'event-activities',     component: TableListComponent },
    { path: 'loyalty-rewards',     component: RewardsComponent },
    // { path: 'login',          component: LoginComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
];
