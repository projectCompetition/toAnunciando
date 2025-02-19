import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCpfCnpj', async: false })
export class IsCpfCnpj implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return cpf.isValid(value) || cnpj.isValid(value); // ✅ Valida CPF ou CNPJ corretamente
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.value}" não é um CPF ou CNPJ válido`;
  }
}
