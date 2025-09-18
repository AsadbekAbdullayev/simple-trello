import React from "react";
import reduxConnect from "../../store/reduxConnect";
import List from "../List";
import { IList } from "../../reducers";
import styled from "styled-components";
import AddList from "../List/AddList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // eski nom Backend emas, HTML5Backend

// Styled Components
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoardHeader = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #0266a2;
  color: #fff;
  ${({ theme }) => theme.headerFontFamily};
`;

const BoardListContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 10px 0;
  overflow-x: auto;
  margin: 0 20px;

  @media only screen and (max-width: 600px) {
    flex-flow: column;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 70px);
  }
`;

interface IBoardProps {
  boardDetail: {
    boardId: string;
    boardName: string;
  };
  boardLists: IList[];
}

const Board: React.FC<IBoardProps> = ({ boardDetail, boardLists }) => {
  return (
    <BoardContainer>
      <BoardHeader>{boardDetail.boardName}</BoardHeader>
      <BoardListContainer>
        <DndProvider backend={HTML5Backend}>
          {boardLists.map((boardList) => (
            <List
              key={boardList.listId}
              boardId={boardDetail.boardId}
              {...boardList}
            />
          ))}
          <AddList boardId={boardDetail.boardId} />
        </DndProvider>
      </BoardListContainer>
    </BoardContainer>
  );
};

// Redux mapping
function mapStateToProps(state: any) {
  const boardDetail = state.boards[0];
  return {
    boardDetail,
    boardLists: state.lists[boardDetail.boardId] || [],
  };
}

export default reduxConnect(Board, null, mapStateToProps);
