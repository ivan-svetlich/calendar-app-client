import { DateTime } from "luxon";
import { useEffect, useReducer } from "react";
import { ItemDto } from "../types/Item";
import server from "../api/calendarServer";
import WeekInterval from "../types/WeekInterval";
import { useNavigate } from "react-router-dom";

export type ItemsState = {
  loading: boolean;
  data: Items[];
  error: string | null;
};

export type Items = {
  dueDate: Date;
  todoItems: ItemDto[];
};

type ACTION =
  | { type: "LOAD"; payload: null }
  | { type: "SUCCESS"; payload: Items[] }
  | { type: "FAILURE"; payload: string };

const initialState: ItemsState = { loading: false, data: [], error: null };

function fetchItemsReducer<ItemsState>(state: ItemsState, action: ACTION) {
  const { type, payload } = action;

  switch (type) {
    case "LOAD":
      return { ...state, loading: true, data: null, error: null };
    case "SUCCESS":
      return { ...state, loading: false, data: payload, error: null };
    case "FAILURE":
      return { ...state, loading: false, data: null, error: payload };
    default:
      return state;
  }
}

export const useFetchItems = (
  week: WeekInterval | undefined
): [
  ItemsState,
  (itemDto: ItemDto, index: number, replace?: boolean) => void
] => {
  const [state, dispatch] = useReducer(fetchItemsReducer, initialState);
  let navigate = useNavigate();

  useEffect(() => {
    if (week) {
      fetchItems(week.start, week.end, dispatch);
    }
  }, [week]);

  const updateState = (
    itemDto: ItemDto,
    index: number,
    replace: boolean = false
  ) => {
    let updatedState = { ...(state as ItemsState) };
    if (replace) {
      updatedState.data[index].todoItems = updatedState.data[
        index
      ].todoItems.map((item) => {
        if (item.id === itemDto.id) {
          return itemDto;
        } else {
          return item;
        }
      });
    } else {
      updatedState.data[index].todoItems.push(itemDto);
    }
    dispatch({ type: "SUCCESS", payload: [...updatedState.data] });
  };

  return [state as ItemsState, updateState];
};

async function fetchItems(
  startDate: DateTime,
  endDate: DateTime,
  dispatch: React.Dispatch<ACTION>
) {
  dispatch({ type: "LOAD", payload: null });
  try {
    await server.getItemsByInterval(startDate, endDate).then((response) => {
      dispatch({ type: "SUCCESS", payload: response.data });
    });
  } catch (error: any) {
    dispatch({ type: "FAILURE", payload: error });
  }
}

export default useFetchItems;
