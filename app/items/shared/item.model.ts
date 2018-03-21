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
    UnitThcContent: number;
    UnitThcContentUnitOfMeasureName: string;
    UnitVolume: number;
    UnitVolumeUnitOfMeasureName: string;
    UnitWeight: number;
    UnitWeightUnitOfMeasureName: string;

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
        this.UnitThcContent =  Number(options.UnitThcContent);
        this.UnitThcContentUnitOfMeasureName = options.UnitThcContentUnitOfMeasureName || '';
        this.UnitVolume = Number(options.UnitVolume);
        this.UnitVolumeUnitOfMeasureName = options.UnitVolumeUnitOfMeasureName || '';
        this.UnitWeight = Number(options.UnitWeight);
        this.UnitWeightUnitOfMeasureName = options.UnitWeightUnitOfMeasureName || '';
    }
}
