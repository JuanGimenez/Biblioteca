import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Ejemplar } from './ejemplar.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EjemplarService {

    private resourceUrl = SERVER_API_URL + 'api/ejemplars';

    constructor(private http: Http) { }

    create(ejemplar: Ejemplar): Observable<Ejemplar> {
        const copy = this.convert(ejemplar);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ejemplar: Ejemplar): Observable<Ejemplar> {
        const copy = this.convert(ejemplar);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ejemplar> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Ejemplar.
     */
    private convertItemFromServer(json: any): Ejemplar {
        const entity: Ejemplar = Object.assign(new Ejemplar(), json);
        return entity;
    }

    /**
     * Convert a Ejemplar to a JSON which can be sent to the server.
     */
    private convert(ejemplar: Ejemplar): Ejemplar {
        const copy: Ejemplar = Object.assign({}, ejemplar);
        return copy;
    }
}
