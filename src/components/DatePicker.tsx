import React from "react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import useCalendar from "../hooks/useCalendar";
import WeekInterval from "../types/WeekInterval";
import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";
type DatePickerProps = {
  setWeek: React.Dispatch<React.SetStateAction<WeekInterval | undefined>>;
};
const DatePicker = ({ setWeek }: DatePickerProps) => {
  type SelectedDate = {
    year: number;
    month: number;
    week: number;
  };
  let query = useQuery();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(() => {
    return {
      year: query.get("year")
        ? Number.parseInt(query.get("year") as string)
        : DateTime.now().year,
      month: query.get("month")
        ? Number.parseInt(query.get("month") as string)
        : (DateTime.now().month as number),
      week: query.get("week")
        ? Number.parseInt(query.get("week") as string)
        : -1,
    };
  });
  const weeks = useCalendar(selectedDate.month, selectedDate.year);
  const [today, setToday] = useState(!query.get("week"));
  let navigate = useNavigate();

  const handlePreviousYear = () => {
    if (selectedDate.year > 0) {
      setSelectedDate((prev) => ({ ...prev, year: prev.year - 1 }));
    }
  };

  const handleNextYear = () => {
    setSelectedDate((prev) => ({ ...prev, year: prev.year + 1 }));
  };

  const handleSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate((prev) => ({
      ...prev,
      month: Number.parseInt(e.target.value),
      week: 0,
    }));
  };

  const handlePreviousWeek = () => {
    if (selectedDate.week > 0) {
      setSelectedDate((prev) => ({ ...prev, week: prev.week - 1 }));
    } else if (selectedDate.month > 1) {
      setSelectedDate((prev) => ({ ...prev, month: prev.month - 1, week: -1 }));
    } else {
      setSelectedDate((prev) => ({
        ...prev,
        year: prev.year - 1,
        month: 12,
        week: -1,
      }));
    }
  };

  const handleNextWeek = () => {
    if (selectedDate.week < weeks.length - 1) {
      setSelectedDate((prev) => ({ ...prev, week: prev.week + 1 }));
    } else if (selectedDate.month < 12) {
      setSelectedDate((prev) => ({ ...prev, month: prev.month + 1, week: 0 }));
    } else {
      setSelectedDate((prev) => ({
        ...prev,
        year: prev.year + 1,
        month: 1,
        week: 0,
      }));
    }
  };

  useEffect(() => {
    if (today) {
      if (
        weeks[0].end.year === DateTime.now().year &&
        weeks[0].end.month === (DateTime.now().month as number)
      ) {
        setToday(false);
        setSelectedDate((prev) => ({ ...prev, week: currentWeek() }));
      } else {
        setSelectedDate((prev) => ({
          ...prev,
          year: DateTime.now().year,
          month: DateTime.now().month as number,
        }));
      }
    }
    function currentWeek() {
      const index = weeks.findIndex(
        (interval) =>
          interval.start < DateTime.now() && interval.end > DateTime.now()
      );
      if (index >= 0) {
        return index;
      } else {
        return 1;
      }
    }
  }, [selectedDate.month, selectedDate.year, today, weeks]);

  useEffect(() => {
    if (
      selectedDate.year === weeks[0].end.year &&
      selectedDate.month === weeks[0].end.month
    ) {
      if (selectedDate.week === -1 || selectedDate.week >= weeks.length) {
        setSelectedDate((prev) => ({ ...prev, week: weeks.length - 1 }));
      } else {
        setWeek(weeks[selectedDate.week]);
        navigate(
          `?year=${selectedDate.year}&month=${selectedDate.month}&week=${selectedDate.week}`,
          { replace: true }
        );
      }
    }
  }, [selectedDate, setWeek, weeks]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isPreviousMonth = () => {
    const currentMonth = weeks[selectedDate.week].start.month;
    const selectedMonth = selectedDate.month;

    return currentMonth !== selectedMonth;
  };

  return (
    <div className="list-date">
      <div className="month">
        <select
          value={selectedDate.month}
          onChange={(e) => handleSelectMonth(e)}
        >
          {months.map((month, index) => (
            <option value={index + 1} key={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="week">
        <button className="add-btn">
          <i
            className="fas fa-chevron-left"
            onClick={(e) => handlePreviousWeek()}
          ></i>
        </button>
        {weeks.length > selectedDate.week && selectedDate.week >= 0 && (
          <div className="current-week">
            <span
              className={
                weeks[selectedDate.week].start.month === selectedDate.month
                  ? "week-start text-bold"
                  : "week-start"
              }
            >
              {`${weeks[selectedDate.week].start.weekdayLong} ${
                weeks[selectedDate.week].start.day
              }`}
            </span>
            <span className="week-divider">{` - `}</span>
            <span
              className={
                weeks[selectedDate.week].end.month === selectedDate.month
                  ? "week-end text-bold"
                  : "week-end"
              }
            >
              {`${weeks[selectedDate.week].end.weekdayLong} ${
                weeks[selectedDate.week].end.day
              }`}
            </span>
          </div>
        )}
        <button className="add-btn" onClick={(e) => handleNextWeek()}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <div>
          <button onClick={() => setToday(true)} className="today-btn">
            Today
          </button>
        </div>
      </div>
      <div className="year">
        <button className="add-btn">
          <i
            className="fas fa-chevron-left"
            onClick={(e) => handlePreviousYear()}
          ></i>
        </button>
        <div className="current-year">
          <span className="week-start">{selectedDate.year}</span>
        </div>
        <button className="add-btn" onClick={(e) => handleNextYear()}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
