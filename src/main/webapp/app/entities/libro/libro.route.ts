import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LibroComponent } from './libro.component';
import { LibroDetailComponent } from './libro-detail.component';
import { LibroPopupComponent } from './libro-dialog.component';
import { LibroDeletePopupComponent } from './libro-delete-dialog.component';

export const libroRoute: Routes = [
    {
        path: 'libro',
        component: LibroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'libro/:id',
        component: LibroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const libroPopupRoute: Routes = [
    {
        path: 'libro-new',
        component: LibroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'libro/:id/edit',
        component: LibroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'libro/:id/delete',
        component: LibroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bibliotecaApp.libro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
