import { IUserDetail } from './../reducers';
import { ADD_LIST_TO_BOARD, FETCH_USER_DETAILS, API_IN_PROGRESS, ADD_CARD_TO_LIST, SWITCH_LISTS, SWITCH_CARDS } from './actionConstants';


export function apiInProgress(payload: boolean) {
    return {
        type: API_IN_PROGRESS,
        payload
    }
}

export function fetchUserDetails(payload: IUserDetail) {
    return {
        type: FETCH_USER_DETAILS,
        payload
    }
}

export function addListToBoard(boardId: string, listId: string, title: string) {
    return {
        type: ADD_LIST_TO_BOARD,
        payload: {
            listId,
            title, 
            boardId
        }
    }
}


export function addCardToList(listId: string, cardId: string, title: string, description: string) {
    return {
        type: ADD_CARD_TO_LIST,
        payload: {
            listId,
            title, 
            cardId,
            description
        }
    }
}

export function switchListItems(boardId: string, sourceId: string, destId: string) {
    return ({
        type: SWITCH_LISTS,
        payload: {
            boardId,
            sourceId,
            destId
        }
    });
}


export function switchCardItems(listId: string, sourceId: string, destId: string) {
    return ({
        type: SWITCH_CARDS,
        payload: {
            listId,
            sourceId,
            destId
        }
    });
}
