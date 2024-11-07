import { IsMongoId, IsNotEmpty } from "class-validator";

export class AddUserToClassDto {
    @IsMongoId()
    @IsNotEmpty()
    user_id: string;
    @IsMongoId()
    @IsNotEmpty()
    for_class: string;
}