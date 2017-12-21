import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Prestamo } from './prestamo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PrestamoService {

    private resourceUrl = SERVER_API_URL + 'api/prestamos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(prestamo: Prestamo): Observable<Prestamo> {
        const copy = this.convert(prestamo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(prestamo: Prestamo): Observable<Prestamo> {
        const copy = this.convert(prestamo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Prestamo> {
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
     * Convert a returned JSON object to Prestamo.
     */
    private convertItemFromServer(json: any): Prestamo {
        const entity: Prestamo = Object.assign(new Prestamo(), json);
        entity.fechaPrestado = this.dateUtils
            .convertDateTimeFromServer(json.fechaPrestado);
        entity.fechasDevuelto = this.dateUtils
            .convertDateTimeFromServer(json.fechasDevuelto);
        return entity;
    }

    /**
     * Convert a Prestamo to a JSON which can be sent to the server.
     */
    private convert(prestamo: Prestamo): Prestamo {
        const copy: Prestamo = Object.assign({}, prestamo);

        copy.fechaPrestado = this.dateUtils.toDate(prestamo.fechaPrestado);

        copy.fechasDevuelto = this.dateUtils.toDate(prestamo.fechasDevuelto);
        return copy;
    }
}
