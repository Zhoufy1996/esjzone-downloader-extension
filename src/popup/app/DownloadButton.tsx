import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { DownloadMessage } from '../../types/contentMessage';
import { CleanLogMessage } from '../../types/backgroundMessage';
import { getCurrentActiveTabId } from '../utils';

const DownloadButton = () => {
  const [state, setState] = useState({
    isLoading: false,
  });

  const handleDownload = useCallback(async () => {
    setState({
      isLoading: true,
    });
    chrome.runtime.sendMessage<CleanLogMessage>({
      type: 'CLEAN_LOG_MESSAGE',
    });
    chrome.tabs.sendMessage<DownloadMessage>(await getCurrentActiveTabId(), { type: 'DOWNLOAD_NOVEL' }, () => {
      setState({
        isLoading: false,
      });
    });
  }, []);

  const { isLoading } = state;
  return (
    <Button disabled={isLoading} onClick={handleDownload} variant="contained">
      下载
    </Button>
  );
};

export default DownloadButton;
