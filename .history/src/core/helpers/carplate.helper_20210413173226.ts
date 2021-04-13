export class CarPlateHelper{
    public static isValidPlateNumber(plateNumber: string){
        return RegExp(/([A-Z]{2})+\s+[0-9]+-[0-9]{2}/g).exec(plateNumber)
    }
}