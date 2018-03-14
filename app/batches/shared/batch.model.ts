export class Batch {
    Id: number;
    Name: string;
    Type: string;
    RoomId: number;
    RoomName: string;
    StrainId: number;
    StrainName: string;
    Count: number;
    LiveCount: number;
    PackagedCount: number;
    HarvestedCount: number;
    DestroyedCount: number;
    SourcePackageId: number;
    SourcePackageLabel: string;
    SourcePlantId: number;
    SourcePlantLabel: string;
    PlantedDate: string;
    LastModified: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Name = options.Name || '';
        this.Type = options.Type || '';
        this.RoomId = Number(options.RoomId);
        this.RoomName = options.RoomName || '';
        this.StrainId = Number(options.StrainId);
        this.StrainName = options.StrainName || '';
        this.Count = Number(options.Count);
        this.LiveCount = Number(options.LiveCount);
        this.PackagedCount = Number(options.PackagedCount);
        this.HarvestedCount = Number(options.HarvestedCount);
        this.DestroyedCount = Number(options.DestroyedCount);
        this.SourcePackageId = Number(options.SourcePackageId);
        this.SourcePackageLabel = options.SourcePackageLabel || '';
        this.SourcePlantId = Number(options.SourcePlantId);
        this.SourcePlantLabel = options.SourcePlantLabel || '';
        this.PlantedDate = options.PlantedDate || '';
        this.LastModified = options.LastModified || '';
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
