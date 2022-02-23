export interface EditorChangeMessage {
  type: 'CHANGE_DATA',
  value:string
}

export interface EditorGetMessage {
  type: 'GET_DATA',
}

export type Message = EditorChangeMessage | EditorGetMessage;
