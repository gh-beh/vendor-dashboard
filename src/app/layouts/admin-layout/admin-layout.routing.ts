import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AlumniComponent } from '../../alumni/alumni.component';
import { EventsComponent } from '../../events/events.component';
import { RewardsComponent } from '../../rewards/rewards.component';
import { LoginComponent } from '../../login/login.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'member-listing',   component: AlumniComponent },
    { path: 'event-activities',     component: EventsComponent },
    { path: 'loyalty-rewards',     component: RewardsComponent },
    // { path: 'login',          component: LoginComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
];
