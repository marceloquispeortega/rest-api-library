import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEditorial } from 'app/shared/model/editorial.model';

type EntityResponseType = HttpResponse<IEditorial>;
type EntityArrayResponseType = HttpResponse<IEditorial[]>;

@Injectable({ providedIn: 'root' })
export class EditorialService {
    private resourceUrl = SERVER_API_URL + 'api/editorials';

    constructor(private http: HttpClient) {}

    create(editorial: IEditorial): Observable<EntityResponseType> {
        return this.http.post<IEditorial>(this.resourceUrl, editorial, { observe: 'response' });
    }

    update(id: number, editorial: IEditorial): Observable<EntityResponseType> {
        return this.http.put<IEditorial>(`${this.resourceUrl}/${id}`, editorial, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEditorial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEditorial[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
