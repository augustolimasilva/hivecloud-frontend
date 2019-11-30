import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Transportadora } from '../model/transportadora';

@Injectable()
export class TransportadoraService {
    private url = 'http://localhost:8080/transportadora';

    constructor (private httpClient: HttpClient) {}

    inserirTransportadora(transportadora: Transportadora): Observable<Transportadora> {
        return this.httpClient.post<Transportadora>('${this.url}', transportadora);
    }

    alterarTransportadora(id: number, transportadora: Transportadora): Observable<Transportadora> {
        return this.httpClient.put<Transportadora>('${this.url}/${id}', transportadora);
    }

    listarTransportadoras(): Observable<Transportadora> {
        return this.httpClient.get<Transportadora>('${this.url}');
    }

    excluirPorId(id: number): Observable<Transportadora>{
        return this.httpClient.delete<Transportadora>('${this.url}/${id}');
    }
}
