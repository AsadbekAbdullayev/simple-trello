import { IUserDetail } from "../reducers";
import {
  ADD_LIST_TO_BOARD,
  FETCH_USER_DETAILS,
  API_IN_PROGRESS,
  ADD_CARD_TO_LIST,
  SWITCH_LISTS,
  SWITCH_CARDS,
} from "./actionConstants";

// General Action Type
interface Action<T, P> {
  type: T;
  payload: P;
}

// Helper to create action
function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
  return { type, payload };
}

// Actions
export function apiInProgress(payload: boolean) {
  return createAction(API_IN_PROGRESS, payload);
}

export function fetchUserDetails(payload: IUserDetail) {
  return createAction(FETCH_USER_DETAILS, payload);
}

export function addListToBoard(boardId: string, listId: string, title: string) {
  return createAction(ADD_LIST_TO_BOARD, { boardId, listId, title });
}

export function addCardToList(
  listId: string,
  cardId: string,
  title: string,
  description: string
) {
  return createAction(ADD_CARD_TO_LIST, { listId, cardId, title, description });
}

export function switchListItems(
  boardId: string,
  sourceId: string,
  destId: string
) {
  return createAction(SWITCH_LISTS, { boardId, sourceId, destId });
}

export function switchCardItems(
  listId: string,
  sourceId: string,
  destId: string
) {
  return createAction(SWITCH_CARDS, { listId, sourceId, destId });
}
