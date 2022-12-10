import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions): {
  (object: unknown, propertyName: string);
} {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return (
            value &&
            !!value.match(
              new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
            )
          );
        },
        defaultMessage(): string {
          return 'Minimum eight characters, at least one letter and one number';
        },
      },
    });
  };
}
