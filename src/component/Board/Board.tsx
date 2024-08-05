import React from 'react';
import reduxConnect from '../../store/reduxConnect';
import List from '../List';
import { IList } from '../../reducers';
import styled from 'styled-components';
import AddList from '../List/AddList';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BoardHeader = styled.div`
    display: flex;
    padding: 10px 20px;
    background-color: #0266a2;
    color: #fff;
    ${({ theme }) => theme.headerFontFamily}
`;

const BoardListContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    padding: 10px 0;
    overflow-x: auto;
    overflow-y: hidden;
    margin-right: 20px;
    margin-left: 20px;

    @media only screen and (max-width: 600px) {
        flex-flow: column;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: calc(100vh - 70px);
    }
`;

const Board: React.FC = ({ boardDetail, boardLists }: any) => {

    return (
        <BoardContainer>
            <BoardHeader>{boardDetail.boardName}</BoardHeader>
            <BoardListContainer>
                <DndProvider backend={Backend}>
                    {boardLists.map((boardList: IList) => (
                        <List key={boardList.listId} boardId={boardDetail.boardId} {...boardList} />
                    ))}
                </DndProvider>
                <AddList boardId={boardDetail.boardId} />
            </BoardListContainer>
        </BoardContainer>
    );
};

function mapStateToProps(state: any) {
    const boardDetail = state.boards[0]
    return {
        boardDetail,
        boardLists: state.lists[boardDetail.boardId] || []
    };
}

export default reduxConnect(Board, null, mapStateToProps);