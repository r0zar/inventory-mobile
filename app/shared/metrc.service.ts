import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Facility } from "../facilities/shared/facility.model"
import { Item } from "../items/shared/item.model"

require('./base64')


@Injectable()
export class MetrcService {

  private header: HttpHeaders = new HttpHeaders().set("authorization", "Basic " + btoa("<vendorkey>:<userkey>"));
  private rootUrl = "https://sandbox-api-ca.metrc.com"
  private licenseNumber = "?licenseNumber=A11-0000002-LIC"

  constructor(private http: HttpClient) {}

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

  // facilities

  getFacilities(): Observable<Facility[]> {
      return this.http.get<Facility[]>("https://sandbox-api-ca.metrc.com/facilities/v1", {headers: this.header})
        .pipe(catchError(this.handleError('getFacilities', [])));
  }

  // rooms

  createRooms({licenseNumber, Rooms}): Observable<any> {
      return this.http.post(`${this.rootUrl}/rooms/v1/create?licenseNumber=${licenseNumber}`, Rooms, {headers: this.header})
        .pipe(catchError(this.handleError('createRooms', [])));
  }

  updateRooms({licenseNumber, Rooms}): Observable<any> {
      return this.http.post(`${this.rootUrl}/rooms/v1/create?licenseNumber=${licenseNumber}`, Rooms, {headers: this.header})
        .pipe(catchError(this.handleError('updateRooms', [])));
  }

  // strains

  createStrains({licenseNumber, Strains}): Observable<any> {
      return this.http.post(`${this.rootUrl}/strains/v1/create?licenseNumber=${licenseNumber}`, Strains, {headers: this.header})
        .pipe(catchError(this.handleError('createStrains', [])));
  }

  updateStrains({licenseNumber, Strains}): Observable<any> {
      return this.http.post(`${this.rootUrl}/strains/v1/update?licenseNumber=${licenseNumber}`, Strains, {headers: this.header})
        .pipe(catchError(this.handleError('updateStrains', [])));
  }

  // plant batches

  createPlantBatch({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/createplantings?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('createPlantBatch', [])));
  }

  changeGrowthPhase({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/changegrowthphase?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhase', [])));
  }

  destroyPlantBatches({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/destroy?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhase', [])));
  }

  // plants

  movePlants({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/moveplants?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('movePlants', [])));
  }

  destroyPlants({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/destroyplants?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('destroyPlants', [])));
  }

  manicurePlants({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/manicureplants?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('manicurePlants', [])));
  }

  harvestPlants({licenseNumber, Plants}): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/harvestplants?licenseNumber=${licenseNumber}`, Plants, {headers: this.header})
        .pipe(catchError(this.handleError('harvestPlants', [])));
  }

  // harvests

  createPackageFromHarvest({licenseNumber, Harvest}): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/createpackages?licenseNumber=${licenseNumber}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromHarvest', [])));
  }

  removeWaste({licenseNumber, Waste}): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/removewaste?licenseNumber=${licenseNumber}`, [Waste], {headers: this.header})
        .pipe(catchError(this.handleError('removeWaste', [])));
  }

  finishHarvest({licenseNumber, Harvest}): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/finish?licenseNumber=${licenseNumber}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('finishHarvest', [])));
  }

  unfinishHarvest({licenseNumber, Harvest}): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/unfinish?licenseNumber=${licenseNumber}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('unfinishHarvest', [])));
  }

  // items

  getItems(): Observable<Item[]> {
      return this.http.get<Item[]>(`${this.rootUrl}/items/v1/active${this.licenseNumber}`, {headers: this.header})
        .pipe(catchError(this.handleError('getItems', [])));
  }

  createItem({licenseNumber, Item}): Observable<any> {
      return this.http.post(`${this.rootUrl}/items/v1/create?licenseNumber=${licenseNumber}`, [Item], {headers: this.header})
        .pipe(catchError(this.handleError('createItem', [])));
  }

  updateItem({licenseNumber, Item}): Observable<any> {
      return this.http.post(`${this.rootUrl}/items/v1/update?licenseNumber=${licenseNumber}`, [Item], {headers: this.header})
        .pipe(catchError(this.handleError('updateItem', [])));
  }

  // packages

  createPackageFromPackages({licenseNumber, Package}): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/create?licenseNumber=${licenseNumber}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromPackages', [])));
  }

  changePackageItem({licenseNumber, Package}): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/change/item?licenseNumber=${licenseNumber}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('changePackageItem', [])));
  }

  adjustPackage({licenseNumber, Package}): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/adjust?licenseNumber=${licenseNumber}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('adjustPackage', [])));
  }

  finishPackage({licenseNumber, Package}): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/finish?licenseNumber=${licenseNumber}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('finishPackage', [])));
  }

  unfinishPackage({licenseNumber, Package}): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/unfinish?licenseNumber=${licenseNumber}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('finishunfinishPackagePackage', [])));
  }

  // sales receipts

  createSalesReceipt({licenseNumber, Sale}): Observable<any> {
      return this.http.post(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${licenseNumber}`, [Sale], {headers: this.header})
        .pipe(catchError(this.handleError('createSalesReceipt', [])));
  }

  updateSalesReceipt({licenseNumber, Sale}): Observable<any> {
      return this.http.put(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${licenseNumber}`, [Sale], {headers: this.header})
        .pipe(catchError(this.handleError('updateSalesReceipt', [])));
  }

  voidSalesReceipt({licenseNumber, Sale}): Observable<any> {
      return this.http.delete(`${this.rootUrl}/sales/v1/receipts/${Sale.Id}?licenseNumber=${licenseNumber}`, {headers: this.header})
        .pipe(catchError(this.handleError('voidSalesReceipt', [])));
  }

  // lab tests

  recordLabTest({licenseNumber, Test}): Observable<any> {
      return this.http.post(`${this.rootUrl}/labtests/v1/record?licenseNumber=${licenseNumber}`, [Test], {headers: this.header})
        .pipe(catchError(this.handleError('recordLabTest', [])));
  }

}
