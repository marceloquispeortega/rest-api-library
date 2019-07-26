import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Editorial } from 'app/shared/model/editorial.model';
import { EditorialService } from './editorial.service';
import { EditorialComponent } from './editorial.component';
import { EditorialDetailComponent } from './editorial-detail.component';
import { EditorialUpdateComponent } from './editorial-update.component';
import { EditorialDeletePopupComponent } from './editorial-delete-dialog.component';
import { IEditorial } from 'app/shared/model/editorial.model';

@Injectable({ providedIn: 'root' })
export class EditorialResolve implements Resolve<IEditorial> {
    constructor(private service: EditorialService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((editorial: HttpResponse<Editorial>) => editorial.body));
        }
        return of(new Editorial());
    }
}

export const editorialRoute: Routes = [
    {
        path: 'editorial',
        component: EditorialComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.editorial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'editorial/:id/view',
        component: EditorialDetailComponent,
        resolve: {
            editorial: EditorialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.editorial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'editorial/new',
        component: EditorialUpdateComponent,
        resolve: {
            editorial: EditorialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.editorial.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'editorial/:id/edit',
        component: EditorialUpdateComponent,
        resolve: {
            editorial: EditorialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.editorial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const editorialPopupRoute: Routes = [
    {
        path: 'editorial/:id/delete',
        component: EditorialDeletePopupComponent,
        resolve: {
            editorial: EditorialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'libraryApp.editorial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
