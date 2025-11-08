import { BadRequestException, ValidationError } from "@nestjs/common";

const FormatValidation = (errors: ValidationError[]): BadRequestException => {
    const massages = errors.map(
        it => Object.values(it.constraints || {}).join(",")
    )
        .join("; ")
    return new BadRequestException(`error valiation: ${massages}`)
}
export default FormatValidation;

