import axios, {AxiosError} from 'axios';

// android emulator localhost
// const apiURL = 'http://10.0.2.2:8000/api';
// ios emulator localhost
const apiURL = 'http://localhost:8000/api';

const agentId = '66eb0e871acdc16eb4f6407b';
const officeId = '66ebbf0f9edad55a97e8317d';
const officeFenceId = '66ebbfdc9edad55a97e83185';

export async function testApi() {
  try {
    const res = await axios.get(`${apiURL}/agent-position`);
    // const res = await axios.get(apiURL);
    // console.log('Response', res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}

export async function postTrackingPosition(position: any) {
  try {
    const res = await axios.post(`${apiURL}/agent-position`, {
      agentId,
      timestamp: position.timestamp,
      meta: {position},
    });
    // console.log("Response", res.data);
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
      `${apiURL}/fencing/offices/${officeId}/officeFences/${officeFenceId}`,
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
      `${apiURL}/fencing/offices/${officeId}/officeFences/${officeFenceId}`,
      body,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
