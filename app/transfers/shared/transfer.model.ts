export class Transfer {
    Id: number;
    Label: string;
    PackageType: string;
    SourceHarvestNames: string;
    RoomId: number;
    RoomName: string;
    Quantity: number;
    UnitOfMeasureName: string;
    UnitOfMeasureAbbreviation: string;
    ProductId: number;
    ProductName: string;
    ProductCategoryName: string;
    PackagedDate: string;
    InitialLabTestingState: string;
    LabTestingState: string;
    LabTestingStateName: string;
    LabTestingStateDate: string;
    IsProductionBatch: boolean;
    ProductionBatchNumber: string;
    IsTestingSample: boolean;
    IsProcessValidationTestingSample: boolean;
    ProductRequiresRemediation: boolean;
    ContainsRemediatedProduct: boolean;
    RemediationDate: string;
    ReceivedFromManifestNumber: number;
    ReceivedFromFacilityLicenseNumber: string;
    ReceivedFromFacilityName: string;
    ReceivedDateTime: string;
    IsOnHold: boolean;
    ArchivedDate: string;
    FinishedDate: string;
    LastModified: string;
    // "Id": 2,
    // "ManifestNumber": "0000000002",
    // "ShipperFacilityLicenseNumber": "123-ABC",
    // "ShipperFacilityName": "Lofty Med-Cultivation B",
    // "TransporterFacilityLicenseNumber": "123-ABC",
    // "TransporterFacilityName": "Lofty Med-Dispensary",
    // "DriverName": "X",
    // "DriverOccupationalLicenseNumber": "",
    // "DriverVehicleLicenseNumber": "",
    // "VehicleMake": "X",
    // "VehicleModel": "X",
    // "VehicleLicensePlateNumber": "X",
    // "DeliveryCount": 0,
    // "ReceivedDeliveryCount": 0,
    // "PackageCount": 7,
    // "ReceivedPackageCount": 6,
    // "CreatedDateTime": "2016-10-10T08:20:45-06:00",
    // "CreatedByUserName": null,
    // "LastModified": "0001-01-01T00:00:00+00:00",
    // "DeliveryId": 2,
    // "RecipientFacilityLicenseNumber": "123-ABC",
    // "RecipientFacilityName": "Lofty Med-Cultivation A",
    // "ShipmentTypeName": "Transfer",
    // "ShipmentTransactionType": "Standard",
    // "EstimatedDepartureDateTime": "2016-10-11T14:48:30.000",
    // "ActualDepartureDateTime": null,
    // "EstimatedArrivalDateTime": "2016-10-11T16:50:00.000",
    // "ActualArrivalDateTime": null,
    // "DeliveryPackageCount": 7,
    // "DeliveryReceivedPackageCount": 6,
    // "ReceivedDateTime": "2016-10-11T16:42:19-06:00"

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Label = options.Label;
        this.PackageType = options.PackageType;
        this.SourceHarvestNames = options.SourceHarvestNames;
        this.RoomId = Number(options.RoomId);
        this.RoomName = options.RoomName;
        this.Quantity = Number(options.Quantity);
        this.UnitOfMeasureName = options.UnitOfMeasureName;
        this.UnitOfMeasureAbbreviation = options.UnitOfMeasureAbbreviation;
        this.ProductId = Number(options.ProductId);
        this.ProductName = options.ProductName;
        this.ProductCategoryName = options.ProductCategoryName;
        this.PackagedDate = options.PackagedDate;
        this.InitialLabTestingState = options.InitialLabTestingState;
        this.LabTestingState = options.LabTestingState;
        this.LabTestingStateName = options.LabTestingStateName;
        this.LabTestingStateDate = options.LabTestingStateDate;
        this.IsProductionBatch = Boolean(options.IsProductionBatch);
        this.ProductionBatchNumber = options.ProductionBatchNumber;
        this.IsTestingSample = Boolean(options.IsTestingSample);
        this.IsProcessValidationTestingSample = Boolean(options.IsProcessValidationTestingSample);
        this.ProductRequiresRemediation = Boolean(options.ProductRequiresRemediation);
        this.ContainsRemediatedProduct = Boolean(options.ContainsRemediatedProduct);
        this.RemediationDate = options.RemediationDate;
        this.ReceivedFromManifestNumber = Number(options.ReceivedFromManifestNumber);
        this.ReceivedFromFacilityLicenseNumber = options.ReceivedFromFacilityLicenseNumber;
        this.ReceivedFromFacilityName = options.ReceivedFromFacilityName;
        this.ReceivedDateTime = options.ReceivedDateTime;
        this.IsOnHold = Boolean(options.IsOnHold);
        this.ArchivedDate = options.ArchivedDate;
        this.FinishedDate = options.FinishedDate;
        this.LastModified = options.LastModified;
    }
}
