import {io} from 'socket.io-client';
import {Socket} from 'socket.io-client';
import {store} from '../stores';
import {Platform} from 'react-native';
import {trackingSlice} from '../stores/tracking.slice';

const iosWSURL = 'http://localhost:8000';
const androidWSURL = 'ws://10.0.2.2:8000';

const wsURL = Platform.OS === 'ios' ? iosWSURL : androidWSURL;

export let socketInstance: SocketConnector | null;

export const socketEvents = {
  createRoom: 'create-room',
  joinRoom: 'join-room',
  sendToRoom: 'send-to-room',
  broadcastToRoom: 'broadcast-to-room',
};

export class SocketConnector {
  uri: string;
  static socket: Socket;

  constructor(uri?: string) {
    this.uri = uri || wsURL;

    if (socketInstance instanceof SocketConnector) {
      return socketInstance;
    }

    SocketConnector.socket = io(this.uri);

    SocketConnector.socket.on(socketEvents.broadcastToRoom, args => {
      console.log(Platform.OS, 'broadcast received', args);

      // appends position to show the admin
      if (store.getState().agent.agentId !== args.agentId) {
        const _position = {
          timestamp: args.position.timestamp,
          ...args.position.coords,
        };
        store.dispatch(
          trackingSlice.actions.appendPositions({position: _position}),
        );
      }
    });

    SocketConnector.socket.on('disconnect', () => {
      console.log('disconnected');
    });
    SocketConnector.socket.on('reconnect', () => {
      console.log('reconnected');
    });

    // SocketConnector.socket.onAny((event, ...args) => {
    //   console.log('got', event, args);
    // });

    socketInstance = this;
    return socketInstance;
  }

  static createRoom() {
    console.log(this.socket.active, this.socket.id);
    this.socket.emit(socketEvents.createRoom, {
      agentId: store.getState().agent.agentId,
    });
  }

  static joinRoom() {
    this.socket.emit(socketEvents.joinRoom, {
      agentId: store.getState().agent.agentId,
    });
  }

  static joinRoomByAgentId({agentId}: any) {
    this.socket.emit(socketEvents.joinRoom, {
      agentId: agentId,
    });
  }

  static sendToRooms({agentId, position}: any) {
    console.log(this.socket.active, this.socket.id);
    this.socket.emit(socketEvents.sendToRoom, {
      agentId,
      position,
      message: 'broadcast this to others',
    });
  }

  static send() {}
}

new SocketConnector();
