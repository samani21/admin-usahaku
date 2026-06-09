import { Calendar, CalendarCheck, CalendarRange, Check, Sun, X, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useCallback, useMemo } from 'react';

// --- Utility Functions for Calendar Logic ---

/**
 * Calculates the days for a given month, including leading and trailing days
 * for a complete week view.
 * @param {Date} date - The date object representing the month to display.
 * @returns {Array<Date>} Array of Date objects for the calendar grid.
 */
const getCalendarDays = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Day index of the first day (0=Sunday, 6=Saturday)
    const startingDay = firstDayOfMonth.getDay();

    const days: Date[] = [];

    // Add leading days (days from the previous month)
    for (let i = startingDay; i > 0; i--) {
        const prevDay = new Date(year, month, 1 - i);
        days.push(prevDay);
    }

    // Add current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        days.push(new Date(year, month, i));
    }

    // Add trailing days (days from the next month)
    const totalDays = days.length;
    const trailingDaysNeeded = 42 - totalDays; // Max 6 weeks * 7 days = 42

    for (let i = 1; i <= trailingDaysNeeded; i++) {
        const nextDay = new Date(year, month + 1, i);
        days.push(nextDay);
    }

    return days.slice(0, 42); // Ensure we don't go over 6 weeks
};

// Converts Date object to YYYY-MM-DD string
// FIX: Menggunakan komponen tanggal lokal (getFullYear, getMonth, getDate)
// untuk menghindari pergeseran zona waktu yang disebabkan oleh toISOString().
const formatDate = (date: Date | null | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    // getMonth() adalah 0-indexed, jadi +1
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


// --- Calendar Month Renderer Component ---

interface CalendarMonthProps {
    displayDate: Date;
    dates: (Date | null)[];
    handleDateClick: (date: Date) => void;
    selectedDateStr: string | null;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ displayDate, dates, handleDateClick, selectedDateStr }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    const days = useMemo(() => getCalendarDays(displayDate), [displayDate]);

    const today = new Date();
    // FIX: Menggunakan formatDate untuk todayStr agar konsisten
    const todayStr = formatDate(today);

    const startDate = dates[0] ? formatDate(dates[0]) : null;
    const endDate = dates[1] ? formatDate(dates[1]) : null;

    return (
        <div className="p-2 flex flex-col items-center select-none max-w-xs mx-auto">

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 text-center w-full">
                {dayNames.map(day => (
                    <div key={day} className="text-sm font-medium text-gray-500 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center w-full">
                {days.map((day, index) => {
                    const dayStr = formatDate(day);
                    const isCurrentMonth = day.getMonth() === displayDate.getMonth();
                    const isToday = dayStr === todayStr;

                    const isStart = dayStr === startDate;
                    const isEnd = dayStr === endDate;
                    const isSelected = isStart || isEnd;

                    let isInRange = false;
                    const start = dates[0];
                    const end = dates[1];

                    if (start && end) {
                        // Check if day is strictly between start and end
                        isInRange = day > start && day < end;
                    }

                    let className = "w-full aspect-square flex items-center justify-center rounded-full text-sm transition-colors cursor-pointer ";

                    // Current Month/Not Current Month Styling
                    className += isCurrentMonth ? 'text-gray-800' : 'text-gray-400 opacity-60 pointer-events-none';

                    // Today Styling
                    if (isToday && !isSelected && !isInRange) {
                        className += ' border border-blue-300 bg-blue-50/50';
                    }

                    // Range Styling
                    if (isInRange) {
                        className += ' bg-blue-100 hover:bg-blue-200 rounded-none';
                        // Specific styles for the cells immediately adjacent to start/end for range fill
                        if (isStart) className += ' rounded-r-none';
                        if (isEnd) className += ' rounded-l-none';
                    }

                    // Selected Day Styling (Start/End)
                    if (isSelected) {
                        className += ' bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700';
                        // Apply rounded corners only on the open ends of the range
                        if (isStart && !isEnd) className += ' rounded-r-none';
                        if (isEnd && !isStart) className += ' rounded-l-none';
                        if (isStart && isEnd) className += ' rounded-full'; // Single day selection
                    } else if (isCurrentMonth) {
                        className += ' hover:bg-gray-100';
                    }

                    // Apply full border radius for days outside the range or the single selected day
                    if (isCurrentMonth && (!isInRange || (isStart && isEnd))) {
                        className = className.replace('rounded-none', 'rounded-full');
                    }

                    return (
                        <div
                            key={index}
                            className={className}
                            onClick={() => isCurrentMonth && handleDateClick(day)}
                        >
                            {day.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Main Modal Component ---

const DateRangeModal: React.FC<{
    isOpen: boolean
    onClose: () => void
    onApply: (dates: Date[]) => void
}> = ({ isOpen, onClose, onApply }) => {
    // 1. STATE HOOKS
    const [dates, setDates] = useState<(Date | null)[]>([null, null]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

    // 2. CALLBACK HOOKS AND FUNCTIONS (Must be unconditional)

    // Handler for month navigation
    const navigateMonth = (direction: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + direction);
            return newDate;
        });
    };

    // Main logic for selecting dates in a range (useCallback)
    const handleDateClick = useCallback((clickedDate: Date) => {
        // Standardize the clicked date to midnight for comparison
        const clickedMidnight = new Date(clickedDate);
        clickedMidnight.setHours(0, 0, 0, 0);

        const [start, end] = dates;

        // Case 1: Start a new range (0 selected, or 2 selected - resetting)
        if (!start || (start && end)) {
            setDates([clickedMidnight, null]);
        }
        // Case 2: Complete the range (1 selected)
        else if (start && !end) {
            if (clickedMidnight.getTime() === start.getTime()) {
                // Clicked the same date, reset selection
                setDates([null, null]);
            } else if (clickedMidnight < start) {
                // Clicked date is before the start date: set it as start, move old start to end
                setDates([clickedMidnight, start]);
            } else {
                // Clicked date is after the start date: set it as end
                setDates([start, clickedMidnight]);
            }
        }
    }, [dates]);


    const handleQuickRange = (type: 'today' | 'last7' | 'last30') => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let start = new Date(today);

        if (type === 'last7') start.setDate(today.getDate() - 6);
        if (type === 'last30') start.setDate(today.getDate() - 29);

        // Reset the calendar view to ensure the selected range is visible
        setCurrentDate(new Date(today));
        setDates([start, today]);
    }

    // 3. CONDITIONAL RETURN (Moved to after all hooks)
    if (!isOpen) return null;

    // 4. DERIVED VALUES AND RENDER
    const startDateStr = formatDate(dates[0]);
    const endDateStr = formatDate(dates[1]);

    // Check if both dates are present (and not null) to display the range
    const isRangeSelected = dates[0] && dates[1];

    const displayRange = isRangeSelected
        ? `${startDateStr} - ${endDateStr}`
        : dates[0] ? `${startDateStr} - ...` : 'Belum Dipilih';

    // Prepare dates for onApply: only send Date[] if both elements are non-null
    const datesToApply = isRangeSelected ? [dates[0] as Date, dates[1] as Date] : [];


    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-100">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ">
                <div className="p-4 border-b border-gray-200 bg-blue-50 flex items-center justify-between">
                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <h2 className="text-lg font-bold text-gray-800">Filter Rentang Tanggal</h2>
                    </div>
                    {/* Display of selected range */}
                    <div className="text-sm font-medium text-blue-700 px-3 py-1 bg-blue-100 rounded-full">
                        {displayRange}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Filter Cepat (Quick Filters) */}
                    <div className="bg-gray-50 md:w-56 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Filter Cepat</h4>
                        <div className="space-y-2">
                            <button onClick={() => handleQuickRange('today')} className="flex items-center w-full py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                                <Sun className="w-4 h-4 mr-2" /> Hari Ini
                            </button>
                            <button onClick={() => handleQuickRange('last7')} className="flex items-center w-full py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                                <CalendarRange className="w-4 h-4 mr-2" /> 7 Hari Terakhir
                            </button>
                            <button onClick={() => handleQuickRange('last30')} className="flex items-center w-full py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition">
                                <CalendarCheck className="w-4 h-4 mr-2" /> 30 Hari Terakhir
                            </button>
                        </div>
                    </div>

                    {/* Custom Calendar Area (Replacement for Flatpickr) */}
                    <div className="p-4 w-full md:w-[320px] flex flex-col items-center">
                        {/* Calendar Header/Navigation */}
                        <div className="flex justify-between items-center px-2 mb-2 w-full max-w-xs">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Bulan Sebelumnya"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {new Date(currentDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                            </h2>
                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Bulan Berikutnya"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Calendar Month View */}
                        <CalendarMonth
                            displayDate={currentDate}
                            dates={dates}
                            handleDateClick={handleDateClick}
                            selectedDateStr={selectedDateStr}
                        />

                        <p className="text-center mt-3 text-xs text-gray-500">
                            Pilih dua tanggal untuk membuat rentang.
                        </p>
                    </div>

                </div>

                <div className="flex justify-end space-x-3 bg-gray-50 p-4 border-t border-gray-200">
                    <button
                        onClick={() => { setDates([null, null]); onClose() }}
                        className="flex items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                    >
                        <X className="w-4 h-4 mr-1" /> Hapus Pilihan
                    </button>
                    <button
                        onClick={() => { onApply(datesToApply); onClose() }}
                        disabled={!isRangeSelected}
                        className={`flex items-center py-2 px-4 font-semibold rounded-lg shadow-md transition ${isRangeSelected ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-300 text-white cursor-not-allowed'
                            }`}
                    >
                        <Check className="w-4 h-4 mr-1" /> Terapkan Filter
                    </button>
                </div>
            </div>
        </div >
    )
}

export default DateRangeModal