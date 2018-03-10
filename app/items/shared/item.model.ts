export class Item {
    Id: number;
    Name: string;
    ProductCategoryName: string;
    ProductCategoryType: string;
    QuantityType: string;
    DefaultLabTestingState: number;
    UnitOfMeasureName: string;
    StrainId: number;
    StrainName: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Name = options.Name || '';
        this.ProductCategoryName = options.ProductCategoryName || '';
        this.ProductCategoryType = options.ProductCategoryType || '';
        this.QuantityType = options.QuantityType || '';
        this.DefaultLabTestingState = Number(options.DefaultLabTestingState);
        this.UnitOfMeasureName = options.UnitOfMeasureName || '';
        this.StrainId = Number(options.StrainId);
        this.StrainName = options.StrainName || '';
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
