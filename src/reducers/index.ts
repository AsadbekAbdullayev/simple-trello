import { FETCH_USER_DETAILS, API_IN_PROGRESS, ADD_CARD_TO_LIST, SWITCH_LISTS, SWITCH_CARDS } from './../actions/actionConstants';
import { ADD_LIST_TO_BOARD } from "../actions/actionConstants";

export interface IBoard {
    boardId: string,
    boardName: string
};

export interface IList {
    listId: string,
    title: string
};

export interface ICard {
    cardId: string,
    title: string,
    description?: string
};

export interface ILists {
    [boardId: string]: Array<IList>
};

export interface ICards {
    [listId: string]: Array<ICard>
}


export interface IUserDetail {
    boards: Array<IBoard>,
    lists: ILists,
    cards: ICards
};

export interface IInitialState extends IUserDetail {
    isApiInProgress: boolean,
    activeBoardId: string
};

export const initialState: IInitialState = {
    boards: [],
    lists: {},
    cards: {},
    isApiInProgress: false,
    activeBoardId: ''
};

export default function reducer(state: IInitialState = initialState, { type, payload }: {type: string, payload: any}): IInitialState {
    // console.log(state, type, payload);
    switch (type) {
        case API_IN_PROGRESS: {
            return {
                ...state,
                isApiInProgress: payload
            }
        }

        case FETCH_USER_DETAILS: {
            return {
                ...state,
                ...payload,
                activeBoardId: payload.boards[0].boardId
            };
        }

        case ADD_LIST_TO_BOARD: {
            const { boardId, ...list } = payload;
            const boardLists = [...state.lists[boardId] || [], list];
            
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [boardId]: boardLists
                }
            };
        }

        case ADD_CARD_TO_LIST: {
            const { listId, ...card } = payload;
            const listCards = [...state.cards[listId] || [], card];
            
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [listId]: listCards
                }
            };
        }

        case SWITCH_LISTS: {
            const { boardId, destId, sourceId } = payload;
            const boardLists = [...state.lists[boardId]];
            let sourceIdIndex = -1, destIdIndex = -1;
            boardLists.forEach((listItem: IList, index: number) => {
                if (listItem.listId === sourceId) {
                    sourceIdIndex = index;
                }
                if (listItem.listId === destId) {
                    destIdIndex = index;
                }
            });
            let temp = boardLists[sourceIdIndex];
            boardLists[sourceIdIndex] = boardLists[destIdIndex];
            boardLists[destIdIndex] = temp;

            return {
                ...state,
                lists: {
                    ...state.lists,
                    [boardId]: boardLists
                }
            };
        }

        case SWITCH_CARDS: {
            const { listId, destId, sourceId } = payload;
            const listCards = [...state.cards[listId]];
            let sourceIdIndex = -1, destIdIndex = -1;
            listCards.forEach((listItem: ICard, index: number) => {
                if (listItem.cardId === sourceId) {
                    sourceIdIndex = index;
                }
                if (listItem.cardId === destId) {
                    destIdIndex = index;
                }
            });
            let temp = listCards[sourceIdIndex];
            listCards[sourceIdIndex] = listCards[destIdIndex];
            listCards[destIdIndex] = temp;

            return {
                ...state,
                cards: {
                    ...state.cards,
                    [listId]: listCards
                }
            };
        }

        default:
            return state;
    }
};
