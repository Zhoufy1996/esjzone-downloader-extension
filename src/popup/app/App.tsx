import { Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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
    const currentUrl = window.location.href;

    if (currentUrl.startsWith('https://www.esjzone.cc/')) {
      setState({
        status: 'valid',
      });
    } else {
      setState({
        status: 'invalid',
      });
    }
  }, []);

  const { status } = state;
  return (
    <div>
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
