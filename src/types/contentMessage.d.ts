export interface DownloadMessage {
  type: 'DOWNLOAD_NOVEL';
}

export interface CheckValidMessage {
  type: 'URL_CHECK_VALID';
}

export type ContentMessage = DownloadMessage | CheckValidMessage;
