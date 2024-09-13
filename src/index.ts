import { IDay, ICalendar } from './interfaces';
import Day from './day.js';

class Calendar implements ICalendar {
    public weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    public months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    public value: Date;
    public days: IDay[];
    #selectedDate: Date;
    public range: Date[] = [];

    constructor(date: Date = new Date()) {
        this.value = new Date();
        this.#selectedDate = new Date(date.setHours(0, 0, 0, 0));
        this.days = this.initCalendar();
    }

    initCalendar() {
        const year: number = this.#selectedDate.getFullYear();
        const month: number = this.#selectedDate.getMonth();

        const _firstDayOfWeek: number = this.#getFirstDayOfWeek(
            month + 1,
            year
        );

        const _currentMonthDaysCount: number = this.#daysInMonth(
            month + 1,
            year
        );
        const _prevMonthDaysCount: number = this.#daysInMonth(month, year);
        const dates: IDay[] = [];

        if (_firstDayOfWeek > 0) {
            let p = _prevMonthDaysCount - _firstDayOfWeek + 1,
                c = 1;
            while (p <= _prevMonthDaysCount) {
                dates.push(
                    new Day(new Date(year, month - 1, p), p, 'prev-month')
                );
                p++;
            }
            while (c <= _currentMonthDaysCount) {
                dates.push(
                    new Day(
                        new Date(year, month, c),
                        c,
                        this.#compareTwoDates(
                            this.#selectedDate,
                            new Date(year, month, c)
                        )
                            ? 'selected-day'
                            : 'current-month'
                    )
                );
                c++;
            }
        } else {
            let i = 1;
            while (i <= _currentMonthDaysCount) {
                dates.push(
                    new Day(
                        new Date(year, month, i),
                        i,
                        this.#compareTwoDates(
                            this.#selectedDate,
                            new Date(year, month, i)
                        )
                            ? 'selected-day'
                            : 'current-month'
                    )
                );
                i++;
            }
        }

        const remainder: number = dates.length % this.weekDays.length;
        let i: number = 1,
            end: number = 0;

        if (dates.length <= 35) {
            // 7 : 5 block
            end = 35 - dates.length;
        }
        if (remainder) {
            end = this.weekDays.length - remainder;
        }
        while (i <= end) {
            dates.push(new Day(new Date(year, month + 1, i), i, 'next-month'));
            i++;
        }
        return dates;
    }

    public toDate(date: Date, selectedRange: Date) {
        if (selectedRange) {
            this.createRange(selectedRange);
        }
        this.#selectedDate = date;
        this.value = date;
        this.days = this.initCalendar();
    }

    public toNextMonth() {
        this.#selectedDate = this.#getNextMonth(this.#selectedDate);
        this.days = this.initCalendar();
    }

    public toPrevMonth() {
        this.#selectedDate = this.#getPrevMonth(this.#selectedDate);
        this.days = this.initCalendar();
    }

    public toNextYear() {
        this.#selectedDate = this.#getNextYear(this.#selectedDate);
        this.days = this.initCalendar();
    }

    public toPrevYear() {
        this.#selectedDate = this.#getPrevYear(this.#selectedDate);
        this.days = this.initCalendar();
    }

    #daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    #getFirstDayOfWeek(month: number, year: number) {
        return new Date(`${year}-${month}-01`).getDay();
    }

    #getPrevMonth(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            date.getDate()
        );
    }

    #getNextMonth(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
    }

    #getPrevYear(date: Date) {
        return new Date(
            date.getFullYear() - 1,
            date.getMonth(),
            date.getDate()
        );
    }
    #getNextYear(date: Date) {
        return new Date(
            date.getFullYear() + 1,
            date.getMonth(),
            date.getDate()
        );
    }
    #compareTwoDates(date1: Date, date2: Date) {
        return date1.getTime() === date2.getTime();
    }

    private createRange(selectedRange: Date) {
        this.range = [this.#selectedDate];
        if (!this.range[1]) {
            this.range.push(selectedRange);
        } else {
            this.range = [this.#selectedDate];
        }

        this.range = this.range?.sort(
            (a: Date, b: Date) => a.getTime() - b.getTime()
        );
    }
}

export type { ICalendar, IDay };
export default Calendar;
