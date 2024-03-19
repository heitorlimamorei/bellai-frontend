/* eslint-disable */
export default interface IMessage {
  id: string;
  content: string;
  role: 'system' | 'user' | 'assistant';
};

export interface IMessageResp {
  content: string;
  role: 'system' | 'user' | 'assistant';
};
