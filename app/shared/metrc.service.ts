import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Facility } from "../facilities/shared/facility.model"


@Injectable()
export class MetrcService {

  constructor(private http: HttpClient) {

  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.dir(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getFacilities(): Observable<Facility[]> {
      let header: HttpHeaders = new HttpHeaders();
      header.append("Authorization", "Basic " + "<vendorkey>:<userkey>");
      return this.http.get<Facility[]>("https://sandbox-api-ca.metrc.com/facilities/v1", {headers: header})
        .pipe(
          catchError(this.handleError('getFacilities', []))
        );
  }

}
