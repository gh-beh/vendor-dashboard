import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRouter} from './admin-layout.routing';
import { BookingsComponent } from '../../bookings/bookings.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {ImagePreloadDirective} from './directives/img-preload.directive';
import {VendorInfoComponent} from '../../vendor-info/vendor-info.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {ComponentsModule} from '../../components/components.module';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        AdminLayoutRouter,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        MatPaginatorModule,
        NgbTimepickerModule,
    ],
    declarations: [
        AdminLayoutComponent,
        VendorInfoComponent,
        BookingsComponent,
        ImagePreloadDirective,
    ]
})

export class AdminLayoutModule {}
