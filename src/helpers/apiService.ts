import uuidv1 from 'uuid/v1';
import { IUserDetail, IList, ICard } from '../reducers';

const boardId = uuidv1();
const listId = uuidv1();
const cardId = uuidv1();
const userDetails: IUserDetail = {
    boards: [
        {
            boardId,
            boardName: 'My Tasks',
        }
    ],
    lists: {
        [boardId]: [
            {
                listId,
                title: 'Backlog'
            }
        ]
    },
    cards: {
        [listId]: [
            {
                cardId,
                title: 'Task 1',
                description: 'Do Something'
            }
        ]
    }
}

const APIUrls = {
    'getUserDetails': '/get-user-board',
    'updateUserBoardList': '/update-board-list',
    'updateUserBoardListWithCard': '/update-board-list-card',
    'updateSwitchUserBoardLists': '/update-switch-user-board-lists',
    'updateSwitchUserBoardListCards': '/update-switch-user-board-list-cards',
};


export function apiService(url: string, method = 'GET', headers?: any, body?: any) {
    return fetch(url, { method, headers, body: JSON.stringify(body) })
        .then(
            (response: Response) => response.json(),
            (error: any) => ({ type: 'error', message: 'Something went wrong!' })
        );
}

// #region Mock Area
/**
 * temporary mock API
 */
const mockApis: any = {
    [APIUrls.getUserDetails]: () => userDetails,
    [APIUrls.updateUserBoardList]: (request: any) => request,
    [APIUrls.updateUserBoardListWithCard]: (request: any) => request,
    [APIUrls.updateSwitchUserBoardLists]: (request: any) => request,
    [APIUrls.updateSwitchUserBoardListCards]: (request: any) => request,
};

function mockApiService(url: string, method?: string, headers?: any, body?: any) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, 1000, mockApis[url](body));
    });
}

// #endregion

export function getUserDetails(): Promise<any> {
    return mockApiService(APIUrls.getUserDetails);
}

export function updateUserBoardWithList(boardId: string, list: IList): Promise<any> {
    return mockApiService(APIUrls.updateUserBoardList, 'POST', {}, {boardId, ...list});
}

export function updateUserBoardListWithCard(boardId: string, listId: string, card: ICard): Promise<any> {
    return mockApiService(APIUrls.updateUserBoardListWithCard, 'POST', {}, {boardId, listId, ...card});
}

export function updateSwitchUserBoardLists(boardId: string, sourceListId: string, destListId: string): Promise<any> {
    return mockApiService(APIUrls.updateSwitchUserBoardLists, 'PUT', {}, {boardId, sourceListId, destListId});
}

export function updateSwitchUserBoardListCards(boardId: string, listId: string, sourceCardId: string, destCardId: string): Promise<any> {
    return mockApiService(APIUrls.updateSwitchUserBoardListCards, 'PUT', {}, {boardId, listId, sourceCardId, destCardId});
}

