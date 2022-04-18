import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AlumniComponent } from '../../alumni/alumni.component';
import { EventsComponent } from '../../events/events.component';
import { RewardsComponent } from '../../rewards/rewards.component';
import { LoginComponent } from '../../login/login.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {FaqComponent} from '../../faq/faq.component';
import {FaqCategoryComponent} from '../../faq-categories/faq-categories.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {AuthGuard} from '../../helpers/auth.guard';

const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: 'dashboard',      component: DashboardComponent },
            { path: 'member-listing',   component: AlumniComponent },
            { path: 'event-activities',     component: EventsComponent },
            { path: 'faq',     component: FaqComponent },
            { path: 'faq-categories',     component: FaqCategoryComponent },
            { path: 'loyalty-rewards',     component: RewardsComponent },
        ]
    },
    // { path: 'login',          component: LoginComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
})
export class AdminLayoutRouter { }
