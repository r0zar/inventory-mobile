import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { alert } from "ui/dialogs";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import firebase = require("nativescript-plugin-firebase");

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

import _ = require('lodash');
require('./base64');


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
      alert({title: error.statusText, message: _.map(error.error, 'message').join('  '), okButtonText: "OK"})
      return of(result as T);
    };
  }

  // facilities

  getFacilities(): Observable<Facility[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getFacilities'}]})
      return this.http.get<Facility[]>("https://sandbox-api-ca.metrc.com/facilities/v1", {headers: this.header})
        .pipe(catchError(this.handleError('getFacilities', [])));
  }

  // rooms

  getRooms(): Observable<Room[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getRooms'}]})
      return this.http.get<Room[]>(`${this.rootUrl}/rooms/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getRooms', [])));
  }

  getRoom(id: number): Observable<Room> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getRoom'}]})
      return this.http.get<Room>(`${this.rootUrl}/rooms/v1/${id}`, {headers: this.header})
        .pipe(tap(room => console.dir(room)), catchError(this.handleError<Room>(`getRoom id=${id}`)));
  }

  createRooms(Rooms): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createRooms'}]})
      return this.http.post(`${this.rootUrl}/rooms/v1/create?licenseNumber=${FacilityService.facility}`, [Rooms], {headers: this.header})
        .pipe(catchError(this.handleError('createRooms', [])));
  }

  updateRooms(Rooms): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'updateRooms'}]})
      return this.http.post(`${this.rootUrl}/rooms/v1/update?licenseNumber=${FacilityService.facility}`, [Rooms], {headers: this.header})
        .pipe(catchError(this.handleError('updateRooms', [])));
  }

  deleteRoom(Room): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'deleteRoom'}]})
      return this.http.delete(`${this.rootUrl}/rooms/v1/${Room.Id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('deleteRoom', [])));
  }

  // strains

  getStrains(): Observable<Strain[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getStrains'}]})
      return this.http.get<Strain[]>(`${this.rootUrl}/strains/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getStrains', [])));
  }

  getStrain(id: number): Observable<Strain> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getStrain'}]})
      return this.http.get<Strain>(`${this.rootUrl}/strains/v1/${id}`, {headers: this.header})
        .pipe(tap(strain => console.dir(strain)), catchError(this.handleError<Strain>(`getStrain id=${id}`)));
  }

  createStrains(Strain): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createStrains'}]})
      return this.http.post(`${this.rootUrl}/strains/v1/create?licenseNumber=${FacilityService.facility}`, [Strain], {headers: this.header})
        .pipe(catchError(this.handleError('createStrains', [])));
  }

  updateStrains(Strain): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'updateStrains'}]})
      return this.http.post(`${this.rootUrl}/strains/v1/update?licenseNumber=${FacilityService.facility}`, [Strain], {headers: this.header})
        .pipe(catchError(this.handleError('updateStrains', [])));
  }

  deleteStrain(Strain): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'deleteStrain'}]})
      return this.http.delete(`${this.rootUrl}/strains/v1/${Strain.Id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('deleteStrain', [])));
  }

  // plant batches

  getBatches(): Observable<Batch[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getBatches'}]})
      return this.http.get<Batch[]>(`${this.rootUrl}/plantbatches/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getBatches', [])));
  }

  getBatch(id: number): Observable<Batch> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getBatch'}]})
      return this.http.get<Batch>(`${this.rootUrl}/plantbatches/v1/${id}`, {headers: this.header})
        .pipe(tap(batch => console.dir(batch)), catchError(this.handleError<Batch>(`getBatch id=${id}`)));
  }

  getBatchTypes(): Observable<any[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getBatchTypes'}]})
      return this.http.get<any[]>(`${this.rootUrl}/plantbatches/v1/types`, {headers: this.header})
        .pipe(catchError(this.handleError('getBatchTypes', [])));
  }

  createPlantings(Batch): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createPlantings'}]})
      return this.http.post(`${this.rootUrl}/plantbatches/v1/createplantings?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('createPlantings', [])));
  }

  createBatchPackage(Batch): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createBatchPackage'}]})
      return this.http.post(`${this.rootUrl}/plantbatches/v1/createPackages?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('createBatchPackage', [])));
  }

  changeGrowthPhase(Batch): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'changeGrowthPhase'}]})
      return this.http.post(`${this.rootUrl}/plantbatches/v1/changegrowthphase?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhase', [])));
  }

  destroyPlantBatches(Batch): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'destroyPlantBatches'}]})
      return this.http.post(`${this.rootUrl}/plantbatches/v1/destroy?licenseNumber=${FacilityService.facility}`, [Batch], {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhase', [])));
  }

  // plants

  getPlantById(id: number): Observable<Plant> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getPlantById'}]})
      return this.http.get<Plant>(`${this.rootUrl}/plants/v1/${id}`, {headers: this.header})
        .pipe(tap(plant => console.dir(plant)), catchError(this.handleError<Plant>(`getPlantById id=${id}`)));
  }

  getVegetativePlants(): Observable<Plant[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getVegetativePlants'}]})
      return this.http.get<Plant[]>(`${this.rootUrl}/plants/v1/vegetative?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getVegetativePlants', [])));
  }

  getFloweringPlants(): Observable<Plant[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getFloweringPlants'}]})
      return this.http.get<Plant[]>(`${this.rootUrl}/plants/v1/flowering?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getFloweringPlants', [])));
  }

  movePlants(Plant): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'movePlants'}]})
      return this.http.post(`${this.rootUrl}/plants/v1/moveplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('movePlants', [])));
  }

  changeGrowthPhases(Plant): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'changeGrowthPhases'}]})
      return this.http.post(`${this.rootUrl}/plants/v1/changegrowthphases?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('changeGrowthPhases', [])));
  }

  destroyPlants(Plant): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'destroyPlants'}]})
      return this.http.post(`${this.rootUrl}/plants/v1/destroyplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('destroyPlants', [])));
  }

  createClones(Plant): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createClones'}]})
      return this.http.post(`${this.rootUrl}/plants/v1/create/plantings?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('createClones', [])));
  }

  manicurePlants(Plant): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'manicurePlants'}]})
      return this.http.post(`${this.rootUrl}/plants/v1/manicureplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('manicurePlants', [])));
  }

  harvestPlants(Plant): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'harvestPlants'}]})
      return this.http.post(`${this.rootUrl}/plants/v1/harvestplants?licenseNumber=${FacilityService.facility}`, [Plant], {headers: this.header})
        .pipe(catchError(this.handleError('harvestPlants', [])));
  }

  // harvests

  getHarvests(type: string): Observable<Harvest[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getHarvests'}]})
      return this.http.get<Harvest[]>(`${this.rootUrl}/harvests/v1/${type}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getHarvests', [])));
  }

  getHarvest(id: number): Observable<Harvest> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getHarvest'}]})
      return this.http.get<Harvest>(`${this.rootUrl}/harvests/v1/${id}`, {headers: this.header})
        .pipe(tap(harvest => console.dir(harvest)), catchError(this.handleError<Harvest>(`getHarvest id=${id}`)));
  }

  createPackageFromHarvest(Harvest): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createPackageFromHarvest'}]})
      return this.http.post(`${this.rootUrl}/harvests/v1/createpackages?licenseNumber=${FacilityService.facility}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromHarvest', [])));
  }

  removeWaste(Waste): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'removeWaste'}]})
      return this.http.post(`${this.rootUrl}/harvests/v1/removewaste?licenseNumber=${FacilityService.facility}`, [Waste], {headers: this.header})
        .pipe(catchError(this.handleError('removeWaste', [])));
  }

  finishHarvest(Harvest): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'finishHarvest'}]})
      return this.http.post(`${this.rootUrl}/harvests/v1/finish?licenseNumber=${FacilityService.facility}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('finishHarvest', [])));
  }

  unfinishHarvest(Harvest): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'unfinishHarvest'}]})
      return this.http.post(`${this.rootUrl}/harvests/v1/unfinish?licenseNumber=${FacilityService.facility}`, [Harvest], {headers: this.header})
        .pipe(catchError(this.handleError('unfinishHarvest', [])));
  }

  // items

  getItem(id: number): Observable<Item> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getItem'}]})
      return this.http.get<Item>(`${this.rootUrl}/items/v1/${id}`, {headers: this.header})
        .pipe(tap(item => console.dir(item)), catchError(this.handleError<Item>(`getItem id=${id}`)));
  }

  getItems(): Observable<Item[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getItems'}]})
      return this.http.get<Item[]>(`${this.rootUrl}/items/v1/active?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getItems', [])));
  }

  getItemCategories(): Observable<any[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getItemCategories'}]})
      return this.http.get<any[]>(`${this.rootUrl}/items/v1/categories`, {headers: this.header})
        .pipe(catchError(this.handleError('getItemCategories', [])));
  }

  createItem(Item): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createItem'}]})
      return this.http.post(`${this.rootUrl}/items/v1/create?licenseNumber=${FacilityService.facility}`, [Item], {headers: this.header})
        .pipe(catchError(this.handleError('createItem', [])));
  }

  updateItem(Item): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'updateItem'}]})
      return this.http.post(`${this.rootUrl}/items/v1/update?licenseNumber=${FacilityService.facility}`, [Item], {headers: this.header})
        .pipe(catchError(this.handleError('updateItem', [])));
  }

  deleteItem(Item): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'deleteItem'}]})
      return this.http.delete(`${this.rootUrl}/items/v1/${Item.Id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('deleteItem', [])));
  }

  // packages

  getPackages(type: string): Observable<Package[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getPackages'}]})
      return this.http.get<Package[]>(`${this.rootUrl}/packages/v1/${type}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getPackages', [])));
  }

  getPackage(id: number): Observable<Package> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getPackage'}]})
      return this.http.get<Package>(`${this.rootUrl}/packages/v1/${id}`, {headers: this.header})
        .pipe(tap(p => console.dir(p)), catchError(this.handleError<Package>(`getPackage id=${id}`)));
  }

  createPackageFromPackages(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createPackageFromPackages'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/create?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromPackages', [])));
  }

  createLabTestPackage(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createLabTestPackage'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/create/testing?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createLabTestPackage', [])));
  }

  createPackageFromPlantings(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createPackageFromPlantings'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/create/plantings?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('createPackageFromPlantings', [])));
  }

  changePackageItem(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'changePackageItem'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/change/item?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('changePackageItem', [])));
  }

  adjustPackage(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'adjustPackage'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/adjust?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('adjustPackage', [])));
  }

  finishPackage(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'finishPackage'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/finish?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('finishPackage', [])));
  }

  unfinishPackage(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'unfinishPackage'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/unfinish?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('finishunfinishPackagePackage', [])));
  }

  remediatePackage(Package): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'remediatePackage'}]})
      return this.http.post(`${this.rootUrl}/packages/v1/remediate?licenseNumber=${FacilityService.facility}`, [Package], {headers: this.header})
        .pipe(catchError(this.handleError('remediatePackage', [])));
  }

  // transfers

  getTransfers(): Observable<Transfer[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getTransfers'}]})
      return this.http.get<Transfer[]>(`${this.rootUrl}/transfers/v1/outgoing?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getTransfers', [])));
  }

  // sales receipts

  getSalesReceipts(): Observable<any[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getSalesReceipts'}]})
      return this.http.get<any[]>(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getSalesReceipts', [])));
  }

  createSalesReceipt(Sale): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'createSalesReceipt'}]})
      return this.http.post(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${FacilityService.facility}`, [Sale], {headers: this.header})
        .pipe(catchError(this.handleError('createSalesReceipt', [])));
  }

  updateSalesReceipt(Sale): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'updateSalesReceipt'}]})
      return this.http.put(`${this.rootUrl}/sales/v1/receipts?licenseNumber=${FacilityService.facility}`, [Sale], {headers: this.header})
        .pipe(catchError(this.handleError('updateSalesReceipt', [])));
  }

  voidSalesReceipt(id: number): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'voidSalesReceipt'}]})
      return this.http.delete(`${this.rootUrl}/sales/v1/receipts/${id}?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('voidSalesReceipt', [])));
  }

  // lab tests

  getLabTestTypes(): Observable<any[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getLabTestTypes'}]})
      return this.http.get<any[]>(`${this.rootUrl}/labtests/v1/types?licenseNumber=${FacilityService.facility}`, {headers: this.header})
        .pipe(catchError(this.handleError('getLabTestTypes', [])));
  }

  recordLabTest(Test): Observable<any> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'recordLabTest'}]})
      return this.http.post(`${this.rootUrl}/labtests/v1/record?licenseNumber=${FacilityService.facility}`, [Test], {headers: this.header})
        .pipe(catchError(this.handleError('recordLabTest', [])));
  }

  // units of Measure

  getUnitsOfMeasure(): Observable<any[]> {
      firebase.analytics.logEvent({key: "metrc_service", parameters: [{key: "method", value: 'getUnitsOfMeasure'}]})
      return this.http.get<any[]>(`${this.rootUrl}/unitsofmeasure/v1/active`, {headers: this.header})
        .pipe(catchError(this.handleError('getUnitsOfMeasure', [])));
  }


}
