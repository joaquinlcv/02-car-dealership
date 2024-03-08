import { IsString } from "class-validator";

export class CreateCarDto {

    //@IsString({message: 'ejemplo de mensaje de error'})
    @IsString()
    readonly brand: string;

    @IsString()
    readonly model: string;

}