import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { FacilityService } from "../facilities/shared/facility.service";
import { Facility } from "../facilities/shared/facility.model"
import { Item } from "../items/shared/item.model"
import { Strain } from "../strains/shared/strain.model"
import { Room } from "../rooms/shared/room.model"
import { Batch } from "../batches/shared/batch.model"
import { Plant } from "../plants/shared/plant.model"
import { Package } from "../packages/shared/package.model"
import { Transfer } from "../transfers/shared/transfer.model"
import { Harvest } from "../harvests/shared/harvest.model"

require('./base64')


@Injectable()
export class MetrcService {

  private header: HttpHeaders = new HttpHeaders().set("authorization", "Basic " + btoa("*:*"));
  private rootUrl = "https://sandbox-api-ca.metrc.com"
  //private licenseNumber = "?licenseNumber=CML17-0000001"

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

  getRooms(): Observable<Room[]> {
      return this.http.get<Room[]>(`${this.rootUrl}/rooms/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getRooms', [])));
  }

  createRooms({licenseNumber, Rooms}): Observable<any> {
      return this.http.post(`${this.rootUrl}/rooms/v1/create?licenseNumber=${FacilityService.facility}`, Rooms, {headers: this.header})
        .pipe(catchError(this.handleError('createRooms', [])));
  }

  updateRooms({licenseNumber, Rooms}): Observable<any> {
      return this.http.post(`${this.rootUrl}/rooms/v1/update?licenseNumber=${FacilityService.facility}`, Rooms, {headers: this.header})
        .pipe(catchError(this.handleError('updateRooms', [])));
  }

  // strains

  getStrains(): Observable<Strain[]> {
      return this.http.get<Strain[]>(`${this.rootUrl}/strains/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getStrains', [])));
  }

  getStrain(id: number): Observable<Strain> {
      return this.http.get<Strain>(`${this.rootUrl}/strains/v1/${id}`, {headers: this.header})
        .pipe(tap(strain => console.dir(strain)), catchError(this.handleError<Strain>(`getStrain id=${id}`)));
  }

  createStrains(Strain): Observable<any> {
      return this.http.post(`${this.rootUrl}/strains/v1/create?licenseNumber=${FacilityService.facility}`, [Strain], {headers: this.header})
        .pipe(catchError(this.handleError('createStrains', [])));
  }

  updateStrains(Strain): Observable<any> {
      return this.http.post(`${this.rootUrl}/strains/v1/update?licenseNumber=${FacilityService.facility}`, [Strain], {headers: this.header})
        .pipe(catchError(this.handleError('updateStrains', [])));
  }

  deleteStrain(Strain): Observable<any> {
      return this.http.delete(`${this.rootUrl}/strains/v1/${Strain.Id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('deleteStrain', [])));
  }

  // plant batches

  getBatches(): Observable<Batch[]> {
      return this.http.get<Batch[]>(`${this.rootUrl}/plantbatches/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getBatches', [])));
  }

  getBatchTypes(): Observable<any[]> {
      return this.http.get<any[]>(`${this.rootUrl}/plantbatches/v1/types`, {headers: this.header})
        .pipe(catchError(this.handleError('getBatchTypes', [])));
  }

  createPlantings(Batch): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/createplantings?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('createPlantings', [])));
  }

  createBatchPackage(Batch): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/createPackages?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('createBatchPackage', [])));
  }

  changeGrowthPhase(Batch): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/changegrowthphase?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhase', [])));
  }

  destroyPlantBatches(Batch): Observable<any> {
      return this.http.post(`${this.rootUrl}/plantbatches/v1/destroy?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhase', [])));
  }

  // plants

  getPlantById(id: number): Observable<Plant> {
      return this.http.get<Plant>(`${this.rootUrl}/plants/v1/${id}`, {headers: this.header})
        .pipe(tap(plant => console.dir(plant)), catchError(this.handleError<Plant>(`getPlantById id=${id}`)));
  }

  getVegetativePlants(): Observable<Plant[]> {
      return this.http.get<Plant[]>(`${this.rootUrl}/plants/v1/vegetative?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getVegetativePlants', [])));
  }

  getFloweringPlants(): Observable<Plant[]> {
      return this.http.get<Plant[]>(`${this.rootUrl}/plants/v1/flowering?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getFloweringPlants', [])));
  }

  movePlants(Plant): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/moveplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('movePlants', [])));
  }

  changeGrowthPhases(Plant): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/changegrowthphases?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhases', [])));
  }

  destroyPlants(Plant): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/destroyplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('destroyPlants', [])));
  }

  createClones(Plant): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/create/plantings?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('createClones', [])));
  }

  manicurePlants(Plant): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/manicureplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('manicurePlants', [])));
  }

  harvestPlants(Plant): Observable<any> {
      return this.http.post(`${this.rootUrl}/plants/v1/harvestplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('harvestPlants', [])));
  }

  // harvests

  getHarvests(): Observable<Harvest[]> {
      return this.http.get<Harvest[]>(`${this.rootUrl}/harvests/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getHarvests', [])));
  }

  createPackageFromHarvest(Harvest): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/createpackages?licenseNumber=${FacilityService.facility}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromHarvest', [])));
  }

  removeWaste(Waste): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/removewaste?licenseNumber=${FacilityService.facility}`, [Waste], {headers: this.header})
        .pipe(catchError(this.handleError('removeWaste', [])));
  }

  finishHarvest(Harvest): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/finish?licenseNumber=${FacilityService.facility}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('finishHarvest', [])));
  }

  unfinishHarvest(Harvest): Observable<any> {
      return this.http.post(`${this.rootUrl}/harvests/v1/unfinish?licenseNumber=${FacilityService.facility}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('unfinishHarvest', [])));
  }

  // items

  getItem(id: number): Observable<Item> {
      return this.http.get<Item>(`${this.rootUrl}/items/v1/${id}`, {headers: this.header})
        .pipe(tap(item => console.dir(item)), catchError(this.handleError<Item>(`getItem id=${id}`)));
  }

  getItems(): Observable<Item[]> {
      return this.http.get<Item[]>(`${this.rootUrl}/items/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getItems', [])));
  }

  getItemCategories(): Observable<any[]> {
      return this.http.get<any[]>(`${this.rootUrl}/items/v1/categories`, {headers: this.header})
        .pipe(catchError(this.handleError('getItemCategories', [])));
  }

  createItem(Item): Observable<any> {
      return this.http.post(`${this.rootUrl}/items/v1/create?licenseNumber=${FacilityService.facility}`, [Item], {headers: this.header})
        .pipe(catchError(this.handleError('createItem', [])));
  }

  updateItem(Item): Observable<any> {
      return this.http.post(`${this.rootUrl}/items/v1/update?licenseNumber=${FacilityService.facility}`, [Item], {headers: this.header})
        .pipe(catchError(this.handleError('updateItem', [])));
  }

  deleteItem(Item): Observable<any> {
      return this.http.delete(`${this.rootUrl}/items/v1/${Item.Id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('deleteItem', [])));
  }

  // packages

  getPackages(): Observable<Package[]> {
      return this.http.get<Package[]>(`${this.rootUrl}/packages/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getPackages', [])));
  }

  createPackageFromPackages(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/create?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromPackages', [])));
  }

  createLabTestPackage(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/create/testing?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createLabTestPackage', [])));
  }

  createPackageFromPlantings(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/create/plantings?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromPlantings', [])));
  }

  changePackageItem(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/change/item?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('changePackageItem', [])));
  }

  adjustPackage(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/adjust?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('adjustPackage', [])));
  }

  finishPackage(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/finish?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('finishPackage', [])));
  }

  unfinishPackage(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/unfinish?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('finishunfinishPackagePackage', [])));
  }

  remediatePackage(Package): Observable<any> {
      return this.http.post(`${this.rootUrl}/packages/v1/remediate?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('remediatePackage', [])));
  }

  // transfers

  getTransfers(): Observable<Transfer[]> {
      return this.http.get<Transfer[]>(`${this.rootUrl}/transfers/v1/outgoing?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getTransfers', [])));
  }

  // sales receipts

  createSalesReceipt(Sale): Observable<any> {
      return this.http.post(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${FacilityService.facility}`, [Sale], {headers: this.header})
        .pipe(catchError(this.handleError('createSalesReceipt', [])));
  }

  updateSalesReceipt(Sale): Observable<any> {
      return this.http.put(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${FacilityService.facility}`, [Sale], {headers: this.header})
        .pipe(catchError(this.handleError('updateSalesReceipt', [])));
  }

  voidSalesReceipt(Sale): Observable<any> {
      return this.http.delete(`${this.rootUrl}/sales/v1/receipts/${Sale.Id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('voidSalesReceipt', [])));
  }

  // lab tests

  recordLabTest(Test): Observable<any> {
      return this.http.post(`${this.rootUrl}/labtests/v1/record?licenseNumber=${FacilityService.facility}`, [Test], {headers: this.header})
        .pipe(catchError(this.handleError('recordLabTest', [])));
  }

  // units of Measure

  getUnitsOfMeasure(): Observable<any[]> {
      return this.http.get<any[]>(`${this.rootUrl}/unitsofmeasure/v1/active`, {headers: this.header})
        .pipe(catchError(this.handleError('getUnitsOfMeasure', [])));
  }


}
