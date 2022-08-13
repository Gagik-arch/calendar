class Calendar {
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    constructor(currentDate = new Date()) {
        this.currentDate = new Date(currentDate.setHours(0, 0, 0, 0))
        this.data = this.initCalendar(this.currentDate)
    }

    initCalendar() {
        const year = this.currentDate.getFullYear()
        const month = this.currentDate.getMonth()

        const _firstDayOfWeek = this.#getFirstDayOfWeek(month + 1, year)
        const _currentMonthDayCount = this.#daysInMonth(month + 1, year)
        const _prevMonthDayCount = this.#daysInMonth(month, year)
        const days = []
        // console.log(this)
        if (_firstDayOfWeek > 0) {
            let p = _prevMonthDayCount - _firstDayOfWeek + 1, c = 1;
            while (p <= _prevMonthDayCount) {
                days.push(
                    new Day(
                        new Date(year, month - 1, p),
                        p,
                        'prev-month'
                    )
                )
                p++
            }
            while (c <= _currentMonthDayCount) {
                days.push(new Day(
                    new Date(year, month, c),
                    c,
                    this.#compareTwoDates(this.currentDate, new Date(year, month, c)) ? 'selected-day' : 'current-month'
                ))
                c++
            }
        } else {
            let i = 1
            while (i <= _currentMonthDayCount) {
                if (this) {

                }
                days.push(new Day(
                    new Date(year, month, i),
                    i,
                    this.#compareTwoDates(this.currentDate, new Date(year, month, i)) ? 'selected-day' : 'current-month'
                ))
                i++
            }
        }

        const remainder = days.length % this.weekDays.length
        let i = 1, end;

        if (days.length <= 35) { // 7 : 5 block
            end = 35 - days.length
        }
        if (remainder) {
            end = this.weekDays.length - remainder
        }
        while (i <= end) {
            days.push(new Day(new Date(year, month + 1, i), i, 'next-month'))
            i++
        }
        return days
    }

    toDate(date) {
        this.currentDate = date
        this.data = this.initCalendar(this.currentDate)
        return this
    }

    toNextMonth() {
        this.currentDate = this.#getNextMonth(this.currentDate)
        this.data = this.initCalendar(this.currentDate)
        return this
    }

    toPrevMonth() {
        this.currentDate = this.#getPrevMonth(this.currentDate)
        this.data = this.initCalendar(this.currentDate)
        return this
    }

    toNextYear() {
        this.currentDate = this.#getNextYear(this.currentDate)
        this.data = this.initCalendar(this.currentDate)
        return this
    }

    toPrevYear() {
        this.currentDate = this.#getPrevYear(this.currentDate)
        this.data = this.initCalendar(this.currentDate)
        return this
    }



    #daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    #getFirstDayOfWeek(month, year) {
        return new Date(year + "-" + month + "-01").getDay();
    }

    #getPrevMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }

    #getNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }

    #getPrevYear(date) {
        return new Date(date.getFullYear() - 1, date.getMonth(), 1);
    }
    #getNextYear(date) {
        return new Date(date.getFullYear() + 1, date.getMonth(), 1);
    }
    #compareTwoDates(date1, date2) {
        return date1.getTime() === date2.getTime();
    }
}
class Day {
    constructor(date, label, status) {
        this.date = date
        this.label = label
        this.status = status
    }
}

export default Calendar