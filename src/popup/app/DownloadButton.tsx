import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { DownloadMessage } from '../../types/contentMessage';
import { CleanLogMessage } from '../../types/backgroundMessage';
import { sendMessageToCurrentActiveContent } from '../../utils';

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

    sendMessageToCurrentActiveContent<DownloadMessage, void>({ type: 'DOWNLOAD_NOVEL' }).then(() => {
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
