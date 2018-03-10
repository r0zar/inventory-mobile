export class Plant {
    Id: number;
    Name: string;
    GrowthPhase: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this.Id = Number(options.Id);
        this.Name = options.Name;
        this.GrowthPhase = options.GrowthPhase;
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
