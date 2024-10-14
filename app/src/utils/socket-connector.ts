import {io} from 'socket.io-client';
import type {Socket} from 'socket.io-client';
import {store} from '../stores';

// const wsURL = 'ws://10.0.2.2:8000';
const wsURL = 'http://localhost:8000';

export let instance: SocketConnector | null;

export class SocketConnector {
  uri: string;
  static socket: Socket;

  constructor(uri?: string) {
    this.uri = uri || wsURL;

    if (instance instanceof SocketConnector) {
      return instance;
    }

    SocketConnector.socket = io(this.uri);

    instance = this;
    return instance;
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

  static send() {}
}

new SocketConnector();

export const socketEvents = {
  createRoom: 'create-room',
  joinRoom: 'join-room',
};
