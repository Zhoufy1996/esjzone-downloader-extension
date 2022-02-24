export interface SendLogMessage {
  type: 'SEND_LOG_MESSAGE';
  message: string;
}

export interface GetLogMessage {
  type: 'GET_LOG_MESSAGE';
  novelId: number;
}

export interface CleanLogMessage {
  type: 'CLEAN_LOG_MESSAGE';
  novelId: number;
}

export type BackgroundMessage = SendLogMessage | GetLogMessage | CleanLogMessage;
