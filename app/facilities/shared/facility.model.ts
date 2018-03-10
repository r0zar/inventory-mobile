export class Facility {
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
    LicenseNumber: string;
    LicenseStartDate: string;
    LicenseEndDate: string;
    LicenseType: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.HireDate = options.HireDate;
        this.HomePage = options.HomePage;
        this.IsOwner = options.IsOwner;
        this.IsManager = options.IsManager;
        this.Occupations = options.Occupations.join(', ');
        this.Name = options.Name;
        this.Alias = options.Alias;
        this.DisplayName = options.DisplayName;
        this.SupportActivationDate = options.SupportActivationDate;
        this.SupportExpirationDate = options.SupportExpirationDate;
        this.SupportLastPaidDate = options.SupportLastPaidDate;
        this.LicenseNumber = options.License.Number,
        this.LicenseStartDate = options.License.StartDate,
        this.LicenseEndDate = options.License.EndDate,
        this.LicenseType = options.License.LicenseType
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
