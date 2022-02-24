import { useInterval } from 'ahooks';
import { useState } from 'react';
import { GetLogMessage } from '../../types/backgroundMessage';

const DownloadMessage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  useInterval(() => {
    chrome.runtime.sendMessage<GetLogMessage>({ type: 'GET_LOG_MESSAGE' }, (res: string[]) => {
      setMessages(res);
    });
  }, 1000);

  return (
    <div>
      {messages.map((msg, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <div key={index}>{msg}</div>;
      })}
    </div>
  );
};

export default DownloadMessage;
