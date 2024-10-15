import {io} from 'socket.io-client';
import {Socket} from 'socket.io-client';
import {store} from '../stores';

// const wsURL = 'ws://10.0.2.2:8000';
const wsURL = 'http://localhost:8000';

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
      console.log('bc rec', args);
    });

    SocketConnector.socket.on('disconnect', () => {
      console.log('disconnected');
    });
    SocketConnector.socket.on('reconnect', () => {
      console.log('reconnected');
    });

    socketInstance = this;
    return socketInstance;
  }

  static createRoom() {
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
    this.socket.emit(socketEvents.sendToRoom, {
      agentId,
      position,
      message: 'broadcast this to others',
    });
  }

  static send() {}
}

new SocketConnector();
