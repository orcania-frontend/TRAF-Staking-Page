import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'src/api';
import { FETCH_WALLET_DATA_REQUEST } from '../constants';
import { fetch_wallet_data_failure, fetch_wallet_data_success } from '../actions';

function* fetch_wallet_data_saga(action) {
    const { userAddress } = action.payload;

    try {
        const res1 = yield call(api.get.genesisTokens, { userAddress });
        const res2 = yield call(api.get.stakedTokens, { userAddress });

        const data = {
            genesisTokens: res1.data,
            stakedTokens: res2.data,
        };

        yield put(fetch_wallet_data_success(data));
    } catch (error) {
        yield put(fetch_wallet_data_failure());
        console.log(error);
    }
}

export default function* saga() {
    yield takeLatest(FETCH_WALLET_DATA_REQUEST, fetch_wallet_data_saga);
}