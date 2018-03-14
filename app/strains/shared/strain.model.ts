export class Strain {
    Id: number;
    Name: string;
    TestingStatus: string;
    ThcLevel: number;
    CbdLevel: number;
    IndicaPercentage: number;
    SativaPercentage: number;
    Genetics: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Name = options.Name || '';
        this.TestingStatus = options.TestingStatus || '';
        this.ThcLevel =  Number(options.ThcLevel);
        this.CbdLevel =  Number(options.CbdLevel);
        this.IndicaPercentage = Number(options.IndicaPercentage);
        this.SativaPercentage = Number(options.SativaPercentage);
        this.Genetics = options.Genetics || '';
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
