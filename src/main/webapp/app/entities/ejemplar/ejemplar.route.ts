import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EjemplarComponent } from './ejemplar.component';
import { EjemplarDetailComponent } from './ejemplar-detail.component';
import { EjemplarPopupComponent } from './ejemplar-dialog.component';
import { EjemplarDeletePopupComponent } from './ejemplar-delete-dialog.component';

export const ejemplarRoute: Routes = [
    {
        path: 'ejemplar',
        component: EjemplarComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.ejemplar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ejemplar/:id',
        component: EjemplarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.ejemplar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ejemplarPopupRoute: Routes = [
    {
        path: 'ejemplar-new',
        component: EjemplarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.ejemplar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ejemplar/:id/edit',
        component: EjemplarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.ejemplar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ejemplar/:id/delete',
        component: EjemplarDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.ejemplar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
