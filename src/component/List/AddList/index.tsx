import React, { Fragment, useState } from 'react';
import Button from '../../shared/Button';
import reduxConnect from '../../../store/reduxConnect';
import { addListToBoard, apiInProgress } from '../../../actions';
import styled from 'styled-components';
import Input from '../../shared/Input';
import { updateUserBoardWithList } from '../../../helpers/apiService';
import uuidv1 from 'uuid/v1';
import { IInitialState } from '../../../reducers';

const AddListContainer = styled.div`
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
    }
`;

const AddListButton = styled.button`
    background-color: rgba(255, 255, 255, 0.24);
    cursor: pointer;
    border-radius: 3px;
    border: none;
    height: auto;
    min-height: 32px;
    padding: 4px;
    transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
    color: #fff;
    ${({theme}) => theme.listBoxWidth }
    height: 40px;
    font-size: 14px;
    font-weight: 600;

    &:hover, &:active {
        background-color: rgba(255, 255, 255, 0.32);
        cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
        max-width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    padding: 5px 0;
    display: flex;
`;

const CloseButton = styled(Button)`
    background-color: transparent;
    margin-left: 5px;
    &:hover, &:active {
        color: #000;
        background-color: #fff;
    }
`;

interface IAddListProps {
    boardId: string,
    addListToBoard: Function,
    apiInProgress: Function,
    isApiInProgress: boolean
};

export function AddList({ boardId, addListToBoard, apiInProgress, isApiInProgress }: IAddListProps) {
    const [showAddList, setShowAddList]: [boolean, Function] = useState(false);
    const [listTitle, setListTitle]: [string, Function] = useState('');

    const onClickAddList = (displayAddList = false) => {
        if (!displayAddList && !listTitle) {
            return;
        }
        setShowAddList(displayAddList);
        if (!displayAddList) {
            apiInProgress(true);
            const listId = uuidv1();
            const updateBoardWithList = async () => {
                await updateUserBoardWithList(boardId, { title: listTitle, listId });
                addListToBoard(boardId, listId, listTitle);
                setListTitle('');
                apiInProgress(false);
            };
            updateBoardWithList();
        }
    };

    const onChangeListTitle = (event: any) => {
        setListTitle(event.target.value);
    };

    const closeAddList = () => {
        setListTitle('');
        setShowAddList(false);
    };

    return (
        <Fragment>
            {showAddList &&
                (<AddListContainer>
                    <Input placeholder='Enter list title...' type='text' value={listTitle} onChange={onChangeListTitle} />
                    <ButtonWrapper>
                        <Button disabled={isApiInProgress} className='success' onClick={() => onClickAddList(false)}>Add List</Button>
                        <CloseButton noBorder className='close' onClick={closeAddList}>&times;</CloseButton>
                    </ButtonWrapper>
                </AddListContainer>)
            }
            {!showAddList && <AddListButton disabled={isApiInProgress} onClick={() => onClickAddList(true)}>+ Add List</AddListButton>}
        </Fragment>
    );
};

const mapStateToProps = ({ isApiInProgress }: IInitialState) => ({
    isApiInProgress
});

export default reduxConnect(AddList, { addListToBoard, apiInProgress }, mapStateToProps)
