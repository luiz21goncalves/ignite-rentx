import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ICompareDateDTO } from "../dtos/ICompareDateDTO";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUtcDate(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours({ start_date, end_date }: ICompareDateDTO): number {
    const endDateUtc = this.convertToUtcDate(end_date);
    const startDateUts = this.convertToUtcDate(start_date);

    return dayjs(endDateUtc).diff(startDateUts, "hours");
  }
}

export { DayjsDateProvider };
