"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTxtFile = exports.IsTxtFileConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsTxtFileConstraint = exports.IsTxtFileConstraint = class IsTxtFileConstraint {
    validate(fileName, args) {
        return fileName.endsWith('.txt');
    }
    defaultMessage(args) {
        return 'File must be a .txt file';
    }
};
exports.IsTxtFileConstraint = IsTxtFileConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isTxtFile', async: false })
], IsTxtFileConstraint);
function IsTxtFile(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isTxtFile',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsTxtFileConstraint,
        });
    };
}
exports.IsTxtFile = IsTxtFile;
//# sourceMappingURL=validation.pipe.js.map