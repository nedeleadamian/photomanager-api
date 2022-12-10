"use strict";
exports.__esModule = true;
exports.IsPassword = void 0;
var class_validator_1 = require("class-validator");
function IsPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isPassword',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value) {
                    return (value &&
                        !!value.match(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')));
                },
                defaultMessage: function () {
                    return 'Minimum eight characters, at least one letter and one number';
                }
            }
        });
    };
}
exports.IsPassword = IsPassword;
