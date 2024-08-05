import React, { useEffect, useState } from 'react';
import reduxConnect from '../../store/reduxConnect';
import Board from '../Board';
import { getUserDetails } from '../../helpers/apiService';
import { IUserDetail, IInitialState } from '../../reducers';
import { fetchUserDetails, apiInProgress } from '../../actions';
import { Loader } from '../shared/Loader';
import styled from 'styled-components';

const PageContainer = styled.div`
    position: relative;
`;

const Dashboard: React.FC = ({ apiInProgress, isApiInProgress, fetchUserDetails }: any) => {
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    useEffect(() => {
        const getUserBoards = async () => {
            apiInProgress(true);
            const userBoards: IUserDetail = await getUserDetails();
            fetchUserDetails(userBoards);
            setInitialDataLoaded(true);
            apiInProgress(false);
        };
        getUserBoards();
    }, []);
    return (
        <PageContainer>
            {initialDataLoaded && <Board />}
            {isApiInProgress && <Loader />}
        </PageContainer>
    );
};

function mapStateToProps(state: IInitialState) {
    return {
        activeBoardId: state.activeBoardId,
        isApiInProgress: state.isApiInProgress
    };
}

export default reduxConnect(Dashboard, { fetchUserDetails, apiInProgress }, mapStateToProps);