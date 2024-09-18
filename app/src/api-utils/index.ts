import axios, {AxiosError} from 'axios';

// android emulator localhost
const apiURL = 'http://10.0.2.2:8000/api';
// ios emulator localhost
// const apiURL = 'http://localhost:8000/api';

export async function testApi() {
  try {
    const res = await axios.get(`${apiURL}/agent-position`);
    // const res = await axios.get(apiURL);
    // console.log('Response', res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
    }
  }
}

export async function postTrackingPosition(position: any) {
  try {
    const agentId = '66eb0e871acdc16eb4f6407b';
    const res = await axios.post(`${apiURL}/agent-position`, {
      agentId,
      timestamp: position.timestamp,
      meta: {position},
    });
    // console.log("Response", res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
    }
  }
}
