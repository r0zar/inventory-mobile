export class Facility {
    Id: number;
    HireDate: string;
    HomePage: string;
    IsOwner: boolean;
    IsManager: boolean;
    Occupations: string;
    Name: string;
    Alias: string;
    DisplayName: string;
    SupportActivationDate: string;
    SupportExpirationDate: string;
    SupportLastPaidDate: string;
    FacilityType: string;
    License: {
      Number: string;
      StartDate: string;
      EndDate: string;
      LicenseType: string;
    }
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.HireDate = options.HireDate;
        this.HomePage = options.HomePage;
        this.IsOwner = options.IsOwner;
        this.IsManager = options.IsManager;
        this.Occupations = options.Occupations;
        this.Name = options.Name;
        this.Alias = options.Alias;
        this.DisplayName = options.DisplayName;
        this.SupportActivationDate = options.SupportActivationDate;
        this.SupportExpirationDate = options.SupportExpirationDate;
        this.SupportLastPaidDate = options.SupportLastPaidDate;
        this.FacilityType = options.FacilityType;
        this.License = {
          Number: options.License.Number,
          StartDate: options.License.StartDate,
          EndDate: options.License.EndDate,
          LicenseType: options.License.LicenseType
        };
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
