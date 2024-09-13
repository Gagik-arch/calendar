import { IDay, ICalendar } from './interfaces';
declare class Calendar implements ICalendar {
    #private;
    weekDays: string[];
    months: string[];
    value: Date;
    days: IDay[];
    range: Date[];
    constructor(date?: Date);
    initCalendar(): IDay[];
    toDate(date: Date, selectedRange: Date): void;
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
    private createRange;
}
export type { ICalendar, IDay };
export default Calendar;
