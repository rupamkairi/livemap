import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {agentSlice} from '../../stores/agent.slice';
import {allAgentIds} from '../../constants';
import {SocketConnector} from '../../utils/socket-connector';
import {useNavigation} from '@react-navigation/native';

export default function AgentSwitch() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const agentId = useSelector(agentSlice.selectors.selectAgentId);
  const trackAgentId = useSelector(agentSlice.selectors.selectTrackAgentId);

  return (
    <View>
      <Text variant="bodySmall">SocketId: {SocketConnector?.socket?.id}</Text>
      <Text variant="bodyMedium">Self AgentId: {agentId}</Text>
      {allAgentIds.map(id => (
        <Button
          key={id}
          style={{margin: 4}}
          mode={id === agentId ? 'contained' : 'outlined'}
          onPress={() => {
            dispatch(agentSlice.actions.setAgentId(id));
          }}>
          {id}
        </Button>
      ))}

      <Text variant="bodyMedium">Tracking Agent: {trackAgentId}</Text>
      {allAgentIds.map(id => (
        <Button
          key={id}
          style={{margin: 4}}
          mode={id === trackAgentId ? 'contained' : 'outlined'}
          onPress={() => {
            dispatch(agentSlice.actions.setTrackAgentId(id));
            SocketConnector.joinRoomByAgentId({agentId: id});
          }}>
          {id}
        </Button>
      ))}
      <Button
        onPress={() => {
          navigate('Agents');
        }}>
        Track Agent
      </Button>
    </View>
  );
}
