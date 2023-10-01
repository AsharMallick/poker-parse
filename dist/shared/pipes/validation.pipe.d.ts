import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsTxtFileConstraint implements ValidatorConstraintInterface {
    validate(fileName: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsTxtFile(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
