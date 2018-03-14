export class Item {
    Id: number;
    Name: string;
    ItemCategory: string;
    ProductCategoryName: string;
    ProductCategoryType: string;
    QuantityType: string;
    DefaultLabTestingState: number;
    UnitOfMeasure: string;
    UnitOfMeasureName: string;
    StrainId: number;
    Strain: string;
    StrainName: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Name = options.Name || '';
        this.ItemCategory = options.ProductCategoryName || '';
        this.ProductCategoryName = options.ProductCategoryName || '';
        this.ProductCategoryType = options.ProductCategoryType || '';
        this.QuantityType = options.QuantityType || '';
        this.DefaultLabTestingState = Number(options.DefaultLabTestingState);
        this.UnitOfMeasure = options.UnitOfMeasureName || '';
        this.UnitOfMeasureName = options.UnitOfMeasureName || '';
        this.StrainId = Number(options.StrainId);
        this.Strain = options.StrainName || '';
        this.StrainName = options.StrainName || '';
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
