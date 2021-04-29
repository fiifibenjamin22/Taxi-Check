"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPlateHelper = void 0;
class CarPlateHelper {
    static isValidPlateNumber(plateNumber) {
        return RegExp(/([A-Z]{2})+\s+[0-9]+-[0-9]{2}/g).exec(plateNumber);
    }
}
exports.CarPlateHelper = CarPlateHelper;
//# sourceMappingURL=carplate.helper.js.map