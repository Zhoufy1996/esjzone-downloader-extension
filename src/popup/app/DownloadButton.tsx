import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { DownloadMessage } from '../../types';

const DownloadButton = () => {
  const [state, setState] = useState({
    loading: false,
  });

  const handleDownload = useCallback(() => {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage<DownloadMessage>(tabs[0]?.id || 0, { type: 'DOWNLOAD' });
      }
    );
  }, []);

  return (
    <Button onClick={handleDownload} variant="contained">
      下载
    </Button>
  );
};

export default DownloadButton;
