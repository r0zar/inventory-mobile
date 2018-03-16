export class Batch {
    Id: number;
    Name: string;
    Type: string;
    RoomId: number;
    RoomName: string;
    Strain: number;
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
    // odd ones required for creating plantings
    ActualDate: string;
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
        this.ActualDate = options.ActualDate || '';
        this.Strain = options.StrainName || '';
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}

export class BatchPackage {
    Id: number;
    Room: string;
    Item: string;
    Tag: string;
    Count: number;
    ActualDate: string;


  constructor(options: any){
      this.Id = Number(options.Id);
      this.Room = options.Room || '';
      this.Item = options.Item || '';
      this.Tag = options.Tag || '';
      this.Count = Number(options.Count);
      this.ActualDate = options.ActualDate || '';
  }
}

export class BatchGrowthPhase {
    Id: number;
    NewRoom: string;
    GrowthPhase: string;
    StartingTag: string;
    Count: number;
    GrowthDate: string;


  constructor(options: any){
      this.Id = Number(options.Id);
      this.NewRoom = options.NewRoom || '';
      this.GrowthPhase = options.GrowthPhase || '';
      this.StartingTag = options.StartingTag || '';
      this.Count = Number(options.Count);
      this.GrowthDate = options.GrowthDate || '';
  }
}

export class BatchDestroy {
    Id: number;
    ReasonNote: string;
    Count: number;
    ActualDate: string;


  constructor(options: any){
      this.Id = Number(options.Id);
      this.ReasonNote = options.ReasonNote || '';
      this.Count = Number(options.Count);
      this.ActualDate = options.ActualDate || '';
  }
}
