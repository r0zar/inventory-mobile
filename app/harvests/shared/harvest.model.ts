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
