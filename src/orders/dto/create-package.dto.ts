import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  lengthCm: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  heightCm: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  widthCm: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weightLb: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
