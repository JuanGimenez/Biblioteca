import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PrestamoComponent } from './prestamo.component';
import { PrestamoDetailComponent } from './prestamo-detail.component';
import { PrestamoPopupComponent } from './prestamo-dialog.component';
import { PrestamoDeletePopupComponent } from './prestamo-delete-dialog.component';

export const prestamoRoute: Routes = [
    {
        path: 'prestamo',
        component: PrestamoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.prestamo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prestamo/:id',
        component: PrestamoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.prestamo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestamoPopupRoute: Routes = [
    {
        path: 'prestamo-new',
        component: PrestamoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.prestamo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prestamo/:id/edit',
        component: PrestamoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.prestamo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prestamo/:id/delete',
        component: PrestamoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.prestamo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
