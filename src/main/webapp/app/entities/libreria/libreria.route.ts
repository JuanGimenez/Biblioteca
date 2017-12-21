import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LibreriaComponent } from './libreria.component';
import { LibreriaDetailComponent } from './libreria-detail.component';
import { LibreriaPopupComponent } from './libreria-dialog.component';
import { LibreriaDeletePopupComponent } from './libreria-delete-dialog.component';

export const libreriaRoute: Routes = [
    {
        path: 'libreria',
        component: LibreriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libreria.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'libreria/:id',
        component: LibreriaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libreria.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const libreriaPopupRoute: Routes = [
    {
        path: 'libreria-new',
        component: LibreriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libreria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'libreria/:id/edit',
        component: LibreriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libreria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'libreria/:id/delete',
        component: LibreriaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libreria.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
