import React from 'react';
import reduxConnect from '../../store/reduxConnect';
import { IList, IInitialState, ICard } from '../../reducers';
import AddCard from '../Card/AddCard';
import styled from 'styled-components';
import Card from '../Card';
import { useDrag, useDrop } from 'react-dnd'
import { switchListItems, apiInProgress } from '../../actions';
import { updateSwitchUserBoardLists } from '../../helpers/apiService';

interface IListProps extends IList {
    cards: Array<ICard>,
    boardId: string,
    switchListItems: Function,
    isApiInProgress: boolean,
    apiInProgress: Function
}

const ListContainer = styled.div`
    background-color: ${({theme}) => theme.listBGColor};
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    ${({theme}) => theme.listBoxWidth }
    height: 100%;
    white-space: nowrap;
    margin-right: 10px;
    padding: 10px;
    @media only screen and (max-width: 600px) {
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 15px;
    }
`;

const ListTitle = styled.div`
    padding-bottom: 10px;
    font-weight: 600;
    font-size: 16px;
    word-break: break-all;
    white-space: normal;
    cursor: move;
`;

const List: React.FC<IListProps> = ({ boardId, listId, title, cards, switchListItems, isApiInProgress, apiInProgress }) => {
    const [, drag, preview] = useDrag({
        item: { listId, type: 'LIST' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.6 : 1,
        }),
        canDrag: () => !isApiInProgress,
        end: (item: any, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult && dropResult.listId !== item.listId) {
                apiInProgress(true);
                const switchBoardLists = async () => {
                    await updateSwitchUserBoardLists(boardId, item.listId, dropResult.listId);
                    switchListItems(boardId, item.listId, dropResult.listId);
                    apiInProgress(false);
                };
                switchBoardLists();
            }
        }
    });


    const [, drop] = useDrop({
        accept: 'LIST',
        drop: () => ({ listId, title })
    });


    return (
        <ListContainer ref={node => preview(drop(node))}>
            <ListTitle ref={drag}>
                {title}
            </ListTitle>
            {
                cards.map((card) => (
                    <Card key={card.cardId} boardId={boardId} listId={listId} {...card} />
                ))
            }
            <AddCard boardId={boardId} listId={listId} />
        </ListContainer>
    );
};

function mapStateToProps(state: IInitialState, { listId }: any) {
    return {
        cards: state.cards[listId] || [],
        isApiInProgress: state.isApiInProgress
    };
}

export default reduxConnect(List, { switchListItems, apiInProgress }, mapStateToProps);