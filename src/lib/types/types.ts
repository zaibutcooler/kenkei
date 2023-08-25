export interface RequestType {
  id: string;
  email: string;
}

export interface Message {
  id: string;
  senderID: string;
  receiverID: string;
  text: string;
  created: number;
}
