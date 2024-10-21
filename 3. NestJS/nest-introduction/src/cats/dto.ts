export class CreateCatDto {
  namae: string;
  age: number;
  breed: string;
}

export class UpdateCatDto {
  name?: string;
  age?: number;
  breed?: string;
}