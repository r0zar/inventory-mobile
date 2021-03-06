export class Transfer {
    Id: number;
    ManifestNumber: string;
    ShipperFacilityLicenseNumber: string;
    ShipperFacilityName: string;
    TransporterFacilityLicenseNumber: string;
    TransporterFacilityName: string;
    DriverName: string;
    DriverOccupationalLicenseNumber: string;
    DriverVehicleLicenseNumber: string;
    VehicleMake: string;
    VehicleModel: string;
    VehicleLicensePlateNumber: string;
    DeliveryCount: number;
    ReceivedDeliveryCount: number;
    PackageCount: number;
    ReceivedPackageCount: number;
    CreatedDateTime: string;
    CreatedByUserName: string;
    LastModified: string;
    DeliveryId: number;
    RecipientFacilityLicenseNumber: string;
    RecipientFacilityName: string;
    ShipmentTypeName: string;
    ShipmentTransactionType: string;
    EstimatedDepartureDateTime: string;
    ActualDepartureDateTime: string;
    EstimatedArrivalDateTime: string;
    ActualArrivalDateTime: string;
    DeliveryPackageCount: number;
    DeliveryReceivedPackageCount: number;
    ReceivedDateTime: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.ManifestNumber = options.ManifestNumber;
        this.ShipperFacilityLicenseNumber = options.ShipperFacilityLicenseNumber;
        this.ShipperFacilityName = options.ShipperFacilityName;
        this.TransporterFacilityLicenseNumber = options.TransporterFacilityLicenseNumber;
        this.TransporterFacilityName = options.TransporterFacilityName;
        this.DriverName = options.DriverName;
        this.DriverOccupationalLicenseNumber = options.DriverOccupationalLicenseNumber;
        this.DriverVehicleLicenseNumber = options.DriverVehicleLicenseNumber;
        this.VehicleMake = options.VehicleMake;
        this.VehicleModel = options.VehicleModel;
        this.VehicleLicensePlateNumber = options.VehicleLicensePlateNumber;
        this.DeliveryCount = Number(options.DeliveryCount);
        this.ReceivedDeliveryCount = Number(options.ReceivedDeliveryCount);
        this.PackageCount = Number(options.PackageCount);
        this.ReceivedPackageCount = Number(options.ReceivedPackageCount);
        this.CreatedDateTime = options.CreatedDateTime;
        this.CreatedByUserName = options.CreatedByUserName;
        this.LastModified = options.LastModified;
        this.DeliveryId = Number(options.DeliveryId);
        this.RecipientFacilityLicenseNumber = options.RecipientFacilityLicenseNumber;
        this.RecipientFacilityName = options.RecipientFacilityName;
        this.ShipmentTypeName = options.ShipmentTypeName;
        this.ShipmentTransactionType = options.ShipmentTransactionType;
        this.EstimatedDepartureDateTime = options.EstimatedDepartureDateTime;
        this.ActualDepartureDateTime = options.ActualDepartureDateTime;
        this.EstimatedArrivalDateTime = options.EstimatedArrivalDateTime;
        this.ActualArrivalDateTime = options.ActualArrivalDateTime;
        this.DeliveryPackageCount = Number(options.DeliveryPackageCount);
        this.DeliveryReceivedPackageCount = Number(options.DeliveryReceivedPackageCount);
        this.ReceivedDateTime = options.ReceivedDateTime;
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
