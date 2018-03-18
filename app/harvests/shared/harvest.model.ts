export class Harvest {
    Id: number;
    Name: string;
    HarvestType: string;
    DryingRoomId: number;
    DryingRoomName: string;
    CurrentWeight: number;
    TotalWasteWeight: number;
    PlantCount: number;
    TotalWetWeight: number;
    PackageCount: number;
    TotalPackagedWeight: number;
    UnitOfWeightName: string;
    LabTestingState: string;
    LabTestingStateDate: string;
    IsOnHold: boolean;
    HarvestStartDate: string;
    FinishedDate: string;
    ArchivedDate: string;
    LastModified: string;
    Strains: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Name = options.Name || '';
        this.HarvestType = options.HarvestType || '';
        this.DryingRoomId = Number(options.DryingRoomId);
        this.DryingRoomName = options.DryingRoomName || '';
        this.CurrentWeight = Number(options.CurrentWeight);
        this.TotalWasteWeight = Number(options.TotalWasteWeight);
        this.PlantCount = Number(options.PlantCount);
        this.TotalWetWeight = Number(options.TotalWetWeight);
        this.PackageCount = Number(options.PackageCount);
        this.TotalPackagedWeight = Number(options.TotalPackagedWeight);
        this.UnitOfWeightName = options.UnitOfWeightName || '';
        this.LabTestingState = options.LabTestingState || '';
        this.LabTestingStateDate = options.LabTestingStateDate || '';
        this.IsOnHold = options.IsOnHold;
        this.HarvestStartDate = options.HarvestStartDate || '';
        this.FinishedDate = options.FinishedDate || '';
        this.ArchivedDate = options.ArchivedDate || '';
        this.LastModified = options.LastModified || '';
        this.Strains = options.Strains.join(', ');
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}

export class Package {
  Harvest: number;
  Room: string;
  Item: string;
  Weight: number;
  UnitOfWeight: string;
  Tag: string;
  IsProductionBatch: boolean;
  ProductionBatchNumber: string;
  ProductRequiresRemediation: boolean;
  RemediateProduct: boolean;
  RemediationMethodId: string;
  RemediationDate: string;
  RemediationSteps: string;
  ActualDate: string;

  constructor(options: any){
    this.Harvest = Number(options.Harvest);
    this.Room = options.Room || '';
    this.Item = options.Item || '';
    this.Weight = Number(options.Weight);
    this.UnitOfWeight = options.UnitOfWeight || '';
    this.Tag = options.Tag || '';
    this.IsProductionBatch = options.IsProductionBatch || false;
    this.ProductionBatchNumber = options.ProductionBatchNumber || '';
    this.ProductRequiresRemediation = options.ProductRequiresRemediation || false;
    this.RemediateProduct = options.RemediateProduct || false;
    this.RemediationMethodId = options.RemediationMethodId || '';
    this.RemediationDate = options.RemediationDate || '';
    this.RemediationSteps = options.RemediationSteps || '';
    this.ActualDate = options.ActualDate || new Date();

  }
}

export class Waste {
  Id: number;
  UnitOfWeight: string;
  WasteWeight: number;
  ActualDate: string;

  constructor(options: any){
    this.Id = Number(options.Id);
    this.UnitOfWeight = options.UnitOfWeight || '';
    this.WasteWeight = Number(options.WasteWeight);
    this.ActualDate = options.ActualDate || new Date();

  }
}
