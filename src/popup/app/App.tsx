import { Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { CheckValidMessage } from '../../types/contentMessage';
import { sendMessageToCurrentActiveContent } from '../../utils';
import DownloadButton from './DownloadButton';
import DownloadMessage from './DownloadMessage';

const App = () => {
  interface State {
    status: 'checking' | 'invalid' | 'valid';
  }

  const [state, setState] = useState<State>({
    status: 'checking',
  });

  useEffect(() => {
    sendMessageToCurrentActiveContent<CheckValidMessage, boolean>({ type: 'URL_CHECK_VALID' })
      .then((res: boolean) => {
        setState({
          status: res ? 'valid' : 'invalid',
        });
      })
      .catch(() => {
        setState({
          status: 'invalid',
        });
      });
  }, []);

  const { status } = state;
  return (
    <div className="app">
      {useMemo(() => {
        if (status === 'checking') {
          return <Typography>判断能否下载中</Typography>;
        }
        if (status === 'invalid') {
          return <Typography>无法下载</Typography>;
        }

        return (
          <div>
            <DownloadButton />
            <DownloadMessage />
          </div>
        );
      }, [status])}
    </div>
  );
};

export default App;
