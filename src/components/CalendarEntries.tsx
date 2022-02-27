import React from "react";
import { DateTime } from "luxon";
import { useState } from "react";
import { Items } from "../hooks/useFetchItems";
import { ItemDto } from "../types/Item";

type CalendarEntriesProps = {
  entries: Items[];
  handleAddItem: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    dueDate: Date,
    inputs: string[],
    setInputs: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  handleMarkCompleted: (item: ItemDto, index: number) => void;
  handleRemoveItem: (id: number) => void;
};

const CalendarEntries = ({
  entries,
  handleAddItem,
  handleMarkCompleted,
  handleRemoveItem,
}: CalendarEntriesProps) => {
  const [inputs, setInputs] = useState<string[]>(["", "", "", "", "", "", ""]);

  const createRemainingLines = (weekday: number, dueDate: Date) => {
    const elements = [];

    elements.push(
      <div className="todo-line" key={`btn-${weekday}`}>
        <button
          name="button"
          id={`${weekday}`}
          type="button"
          className="add-btn"
          onClick={(e) => handleAddItem(e, dueDate, inputs, setInputs)}
        >
          +
        </button>
        <div className="todo-description">
          <input
            className="add-input"
            value={inputs[weekday]}
            onChange={(e) =>
              setInputs((prev) =>
                prev.map((content, index) => {
                  if (index === weekday) {
                    return e.target.value;
                  } else {
                    return content;
                  }
                })
              )
            }
          />
        </div>
      </div>
    );
    return elements;
  };
  const isPreviousMonth = (date: Date) => {
    const currentMonth = DateTime.fromISO(date.toString(), {
      zone: "utc",
    }).month;
    const selectedMonth = DateTime.fromISO(
      entries[entries.length - 1].dueDate.toString(),
      { zone: "utc" }
    ).month;

    return currentMonth !== selectedMonth;
  };

  return (
    <div className="calendar-entries">
      {entries &&
        entries.map((day, dayIndex) => (
          <div className="day-container" key={dayIndex}>
            <div className="day">
              <span>
                {`${
                  DateTime.fromISO(day.dueDate.toString(), { zone: "utc" })
                    .weekdayLong
                } ${
                  DateTime.fromISO(day.dueDate.toString(), { zone: "utc" }).day
                }`}
              </span>
              {isPreviousMonth(day.dueDate) && (
                <span className="prev-month">
                  {`( ${
                    DateTime.fromISO(day.dueDate.toString(), { zone: "utc" })
                      .monthLong
                  } )`}
                </span>
              )}
            </div>
            <div className="daily-entries">
              {day.todoItems &&
                day.todoItems.map((item, index) => (
                  <div className="todo-line" key={`${index}-${dayIndex}`}>
                    <div className="line-controls">
                      {item.completed ? (
                        <span className="todo-completed">✓</span>
                      ) : (
                        <button
                          id={`${item.id}-completed`}
                          className="done-btn"
                          onClick={(e) => handleMarkCompleted(item, dayIndex)}
                        >
                          ✓
                        </button>
                      )}
                    </div>
                    <div
                      className={
                        item.completed
                          ? `todo-description completed`
                          : `todo-description`
                      }
                      id={`${item.id}-description`}
                    >
                      {item.description}
                    </div>
                    <div>
                      <button
                        className="remove-btn"
                        disabled={false}
                        onClick={(e) => handleRemoveItem(item.id)}
                        id={`${item.id}-remove`}
                      >
                        <i className="icon fas fa-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              {day.todoItems && createRemainingLines(dayIndex, day.dueDate)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CalendarEntries;
