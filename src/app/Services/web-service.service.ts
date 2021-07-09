import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { env } from 'src/environments/environment';
import { HandleErrorsService } from 'src/app/Services/handle-errors.service';
import { ITunesSearchResults } from '../interfaces/itunes-search-result.interface';

@Injectable({
  providedIn: 'root',
})
export class WebServiceService {
  private apiUrl: string = env.apiUrl;

  constructor(
    private httpClient: HttpClient,
    public router: Router,
    public handleError: HandleErrorsService // public errorHandler: ErrorHandlerService
  ) {}

  /* GET Itunes by search */
  public getITunesResults(term: string): Observable<ITunesSearchResults> {
    term = term.trim();
    // console.log('api url', this.apiUrl);
    return this.httpClient.jsonp<ITunesSearchResults>(
      this.apiUrl + '/search?term=' + term,
      'callback'
      // ).pipe(
      //     catchError(this.handleError(error)) // then handle the error
    );
  }
}
