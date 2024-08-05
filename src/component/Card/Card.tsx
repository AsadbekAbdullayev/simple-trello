import React, { Fragment, useState } from 'react';
import styled from "styled-components";
import { ICard, IInitialState } from '../../reducers';
import Button from '../shared/Button';
import { useDrag, useDrop } from 'react-dnd';
import reduxConnect from '../../store/reduxConnect';
import { switchCardItems, apiInProgress } from '../../actions';
import { updateSwitchUserBoardListCards } from '../../helpers/apiService';

const CardItem = styled.div`
    background-color: #fff;
    border-radius: 3px;
    box-shadow: ${({theme}) => theme.boxShadow};
    cursor: pointer;
    padding: 10px;
    margin-bottom: 10px;

    &:hover, &:active {
        background-color: #f4f5f7;
    }
`;

const CardModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const CardModalContent = styled.div`
    width: 380px;
    min-height: 200px;
    margin: calc(50vh - 200px) auto;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    @media only screen and (max-width: 600px) {
        width: 78%;
        margin: calc(50vh - 150px) auto;
    }
`;

const CardModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    align-items: center;
`;

const CardTitle = styled.div`
    flex: 1;
    font-size: 20px;
    font-weight: 600;
`;

const CardModalBody = styled.div`
    display: flex;
    flex: 1;
    padding: 10px 0;
`;

const CardModalButton = styled(Button)`

`;

interface ICardProps extends ICard {
    listId: string,
    switchCardItems: Function,
    isApiInProgress: boolean,
    boardId: string,
    apiInProgress: Function
}

const Card: React.FC<ICardProps> = ({ cardId, listId, boardId, title, description, switchCardItems, isApiInProgress, apiInProgress}) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const [, drag, preview] = useDrag({
        item: { cardId, type: 'list-' + listId },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.6 : 1,
        }),
        canDrag: () => !isApiInProgress,
        end: (item: any, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult && dropResult.cardId !== item.cardId) {
                apiInProgress(true);
                const switchBoardListCards = async () => {
                    await updateSwitchUserBoardListCards(boardId, listId, item.cardId, dropResult.cardId);
                    switchCardItems(listId, item.cardId, dropResult.cardId);
                    apiInProgress(false);
                };
                switchBoardListCards();
            }
        }
    });


    const [, drop] = useDrop({
        accept: 'list-' + listId,
        drop: () => ({ cardId, title })
    });

    return (
        <Fragment>
            <CardItem ref={node => preview(drag(drop(node)))} onClick={toggleModal}>{title}</CardItem>
            {showModal &&
                (<CardModalContainer>
                    <CardModalContent>
                        <CardModalHeader>
                            <CardTitle>
                                {title}
                            </CardTitle>
                            <CardModalButton className='close' noBorder onClick={toggleModal}>&times;</CardModalButton>
                        </CardModalHeader>
                        <CardModalBody>
                            {description}
                        </CardModalBody>
                    </CardModalContent>
                </CardModalContainer>)
            }
        </Fragment>
    );
};

const mapStateToProps = ({ isApiInProgress }: IInitialState) => ({
    isApiInProgress
});

export default reduxConnect(Card, { switchCardItems, apiInProgress }, mapStateToProps);