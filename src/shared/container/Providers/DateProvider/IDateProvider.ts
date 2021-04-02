import { ICompareDateDTO } from "./dtos/ICompareDateDTO";

interface IDateProvider {
  compareInHours(data: ICompareDateDTO): number;
  convertToUtcDate(date: Date): string;
}

export { IDateProvider };
