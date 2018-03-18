export class Plant {
    Id: number;
    Label: string;
    GrowthPhase: string;
    PlantBatchId: number;
    PlantBatchName: string;
    PlantBatchTypeName: string;
    StrainId: number;
    StrainName: string;
    RoomId: number;
    RoomName: string;
    HarvestId: number;
    HarvestedUnitOfWeightName: string;
    HarvestedUnitOfWeightAbbreviation: string;
    HarvestedWetWeight: number;
    HarvestCount: number;
    IsOnHold: boolean;
    PlantedDate: string;
    VegetativeDate: string;
    FloweringDate: string;
    HarvestedDate: string;
    DestroyedDate: string;
    DestroyedNote: string;
    DestroyedByUserName: string;
    LastModified: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Label = options.Label || '';
        this.GrowthPhase = options.GrowthPhase || '';
        this.PlantBatchId = Number(options.PlantBatchId);
        this.PlantBatchName = options.PlantBatchName || '';
        this.PlantBatchTypeName = options.PlantBatchTypeName || '';
        this.StrainId = Number(options.StrainId)
        this.StrainName = options.StrainName || '';
        this.RoomId = Number(options.RoomId)
        this.RoomName = options.RoomName || '';
        this.HarvestId = Number(options.HarvestId)
        this.HarvestedUnitOfWeightName = options.HarvestedUnitOfWeightName || '';
        this.HarvestedUnitOfWeightAbbreviation = options.HarvestedUnitOfWeightAbbreviation || '';
        this.HarvestedWetWeight = options.HarvestedWetWeight || '';
        this.HarvestCount = Number(options.HarvestCount)
        this.IsOnHold = options.IsOnHold
        this.PlantedDate = options.PlantedDate;
        this.VegetativeDate = options.VegetativeDate;
        this.FloweringDate = options.FloweringDate;
        this.HarvestedDate = options.HarvestedDate;
        this.DestroyedDate = options.DestroyedDate;
        this.DestroyedNote = options.DestroyedNote;
        this.DestroyedByUserName = options.DestroyedByUserName;
        this.LastModified = options.LastModified;
    }
}

export class Move {
    Id: number;
    Label: string;
    Room: string;
    ActualDate: string;

    constructor(options: any) {
      this.Id = Number(options.Id);
      this.Label = options.Label || '';
      this.Room = options.Room || '';
      this.ActualDate = options.ActualDate || new Date();
    }

}

export class GrowthPhaseChange {
    Id: number;
    Label: string;
    NewTag: string;
    GrowthPhase: string;
    NewRoom: string;
    GrowthDate: string;

    // this constructor was designed to convert Plants
    constructor(options: any) {
      this.Id = Number(options.Id);
      this.Label = options.Label || '';
      this.NewTag = options.Label || '';
      this.GrowthPhase = options.GrowthPhase || '';
      this.NewRoom = options.NewRoom || '';
      this.GrowthDate = options.GrowthDate || new Date();
    }

}

export class Destroy {
    Id: number;
    Label: string;
    ReasonNote: string;
    ActualDate: string;

    constructor(options: any) {
      this.Id = Number(options.Id);
      this.Label = options.Label || '';
      this.ReasonNote = options.ReasonNote || '';
      this.ActualDate = options.ActualDate || new Date();
    }

}

export class Plantings {
    PlantLabel: string;
    PlantBatchName: string;
    PlantBatchType: string;
    PlantCount: number;
    StrainName: string;
    ActualDate: string;

    // this constructor was designed to convert Plants
    constructor(options: any) {
      this.PlantLabel = options.Label || '';
      this.PlantBatchName = options.PlantBatchName || '';
      this.PlantBatchType = options.PlantBatchType || '';
      this.PlantCount = Number(options.PlantCount);
      this.StrainName = options.StrainName || '';
      this.ActualDate = options.ActualDate || new Date();
    }

}

export class Harvest {
    Plant: string;
    Label: string;
    Weight: number;
    UnitOfWeight: string;
    DryingRoom: string;
    HarvestName: string;
    ActualDate: string;

    // this constructor was designed to convert Plants
    constructor(options: any) {
      this.Plant = options.Label || '';
      this.Label = options.Label || '';
      this.Weight = Number(options.Weight);
      this.UnitOfWeight = options.UnitOfWeight || 'Grams';
      this.DryingRoom = options.DryingRoom || '';
      this.HarvestName = options.HarvestName || '';
      this.ActualDate = options.ActualDate || new Date();
    }

}
