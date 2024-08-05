import React, { Fragment, useState } from 'react';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { addCardToList, apiInProgress } from '../../../actions';
import styled from 'styled-components';
import reduxConnect from '../../../store/reduxConnect';
import { updateUserBoardListWithCard } from '../../../helpers/apiService';
import uuidv1 from 'uuid/v1';

const AddCardContainer = styled.div`
    background-color: #ffffff;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    padding: 5px 0;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

const AddCardButton = styled(Button)`
    border: none;
    background-color: transparent;
    color: #5e6c84;
    font-weight: 600;
    font-size: 14px;
    
    &:hover, &:active {
        background-color: rgba(9,30,66,.08);
        color: #172b4d;
    }
`;

const ButtonWrapper = styled.div`
    padding: 5px 10px;
    display: flex;
    & button:last-child {
        margin-left: 5px;
        &:hover, &:active {
            background-color: ${({theme}) => theme.listBGColor};
            color: #000;
        }
    }
`;

const useCustomState = (defaultValue: any) => {
    const [value, setValue] = useState(defaultValue);
    return {
        value,
        setValue
    };
};

export function AddCard({ boardId, listId, addCardToList, apiInProgress, isApiInProgress }: any) {
    const showAddCard = useCustomState(false);
    const cardTitle = useCustomState('');
    const cardDescription = useCustomState('');

    const onClickAddCard = (displayAddCard = false) => {
        if (!displayAddCard && !cardTitle.value) {
            return;
        }
        showAddCard.setValue(displayAddCard);
        if (!displayAddCard) {
            apiInProgress(true);
            const cardId = uuidv1();
            const updateBoardBoardWithCard = async () => {
                await updateUserBoardListWithCard(boardId, boardId, {
                    title: cardTitle.value, description: cardDescription.value, cardId
                });
                addCardToList(listId, cardId, cardTitle.value, cardDescription.value);
                cardTitle.setValue('');
                cardDescription.setValue('');
                apiInProgress(false);
            };
            updateBoardBoardWithCard();
        }
    };

    const onChangeCardTitle = (event: any) => {
        cardTitle.setValue(event.target.value);
    };

    const onChangeCardDesc = (event: any) => {
        cardDescription.setValue(event.target.value);
    };

    const closeAddCard = () => {
        cardTitle.setValue('');
        cardDescription.setValue('');
        showAddCard.setValue(false);
    };

    return (
        <Fragment>
            {showAddCard.value &&
                (<AddCardContainer>
                    <Input
                        disabled={isApiInProgress}
                        placeholder='Enter a title for this card…'
                        value={cardTitle.value}
                        onChange={onChangeCardTitle}
                    />
                    <Input
                        disabled={isApiInProgress}
                        noBoxShadow={true}
                        placeholder='Enter a description for this card…'
                        value={cardDescription.value}
                        onChange={onChangeCardDesc}
                    />
                    <ButtonWrapper>
                        <Button
                            disabled={isApiInProgress}
                            className='success'
                            onClick={() => onClickAddCard(false)}
                        >
                            Add Card
                        </Button>
                        <Button
                            disabled={isApiInProgress}
                            noBorder
                            className='close'
                            onClick={closeAddCard}
                        >
                            &times;
                        </Button>
                    </ButtonWrapper>
                </AddCardContainer>)
            }
            {!showAddCard.value && <AddCardButton disabled={isApiInProgress} onClick={() => onClickAddCard(true)}>+ Add Card</AddCardButton>}
        </Fragment>
    );
}

export default reduxConnect(AddCard, { addCardToList, apiInProgress });