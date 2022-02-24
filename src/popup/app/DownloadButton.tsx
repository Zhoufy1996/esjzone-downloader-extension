import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { DownloadMessage } from '../../types';
import { CleanLogMessage } from '../../types/backgroundMessage';

const DownloadButton = () => {
  const [state, setState] = useState({
    isLoading: false,
  });

  const handleDownload = useCallback(() => {
    setState({
      isLoading: true,
    });
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (tabs) => {
        chrome.runtime.sendMessage<CleanLogMessage>({
          type: 'CLEAN_LOG_MESSAGE',
        });
        chrome.tabs.sendMessage<DownloadMessage>(tabs[0]?.id || 0, { type: 'DOWNLOAD' }, () => {
          setState({
            isLoading: false,
          });
        });
      }
    );
  }, []);

  const { isLoading } = state;
  return (
    <Button disabled={isLoading} onClick={handleDownload} variant="contained">
      下载
    </Button>
  );
};

export default DownloadButton;
