import axios, {AxiosError} from 'axios';
import {Platform} from 'react-native';
import {officeFenceId, officeId} from '../constants';
import {store} from '../stores';
import {SocketConnector} from './socket-connector';

const androidAPIURL = 'http://10.0.2.2:8000/api';
const iosAPIURL = 'http://localhost:8000/api';

const apiURL = Platform.OS === 'ios' ? iosAPIURL : androidAPIURL;

export async function testApi() {
  try {
    const res = await axios.get(`${apiURL}`);
    console.log('Response', res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}

export async function postTrackingPosition(position: any) {
  try {
    const _agentId = store.getState().agent.agentId;
    SocketConnector.sendToRooms({
      agentId: _agentId,
      position,
    });

    const res = await axios.post(`${apiURL}/agent-positions`, {
      agentId: _agentId,
      timestamp: position.timestamp,
      meta: {position},
    });
    // console.log("Response", res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}

export async function getOffice() {
  try {
    const res = await axios.get(`${apiURL}/fencing/offices/${officeId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOfficeFence() {
  try {
    const res = await axios.get(
      `${apiURL}/fencing/offices/${officeId}/office-fences/${officeFenceId}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function patchOfficeFence({polygon}: any) {
  try {
    const body = {
      polygon,
    };
    const res = await axios.patch(
      `${apiURL}/fencing/offices/${officeId}/office-fences/${officeFenceId}`,
      body,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAgentPositions(date?: any) {
  try {
    const qs = new URLSearchParams();
    qs.append('agentId', store.getState().agent.trackAgentId);
    qs.append('date', date ? new Date(date).toISOString() : '');
    console.log(qs.toString());
    const res = await axios.get(`${apiURL}/agent-positions?${qs.toString()}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}
