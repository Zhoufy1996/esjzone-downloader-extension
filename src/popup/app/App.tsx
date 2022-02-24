import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DownloadButton from './DownloadButton';

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
      {status === 'checking' && <Typography>判断能否下载中</Typography>}
      {status === 'invalid' && <Typography>无法下载</Typography>}
      {status === 'valid' && <DownloadButton />}
    </div>
  );
};

export default App;
