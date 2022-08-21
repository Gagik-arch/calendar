export interface DayI{ 
    date: Date
    label: number |string
    status:string
    
}

export interface CalendarI{ 
    currentDate: Date,
    selectedDate: Date,
    days: DayI[],
    months: string[],
    weekDays:string[]
}