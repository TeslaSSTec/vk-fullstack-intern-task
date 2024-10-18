import { IsString, IsUrl } from "class-validator";
import { Like } from "./like.entity";

export class createLikeDto {
  @IsString()
  cat_id: string;

  @IsString()
  @IsUrl()
  url: string;
}

export interface getLikesDto {
  data: Like[];
}
