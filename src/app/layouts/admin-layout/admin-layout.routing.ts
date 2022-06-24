import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsComponent } from '../../bookings/bookings.component';
import {VendorInfoComponent} from '../../vendor-info/vendor-info.component';
import {AdminLayoutComponent} from './admin-layout.component';

const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        // canActivateChild: [AuthGuard],
        children: [
            { path: 'accepted',   component: BookingsComponent },
            { path: 'open',     component: BookingsComponent },
            { path: 'cancelled',     component: BookingsComponent },
            { path: 'information',     component: VendorInfoComponent },
        ]
    },
    {
        path: '/vendor',
        component: BookingsComponent,
        // canActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
})
export class AdminLayoutRouter { }
