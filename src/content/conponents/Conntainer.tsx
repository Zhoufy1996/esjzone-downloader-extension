import { PropsWithChildren, useState } from 'react';

const Container = ({ children }:PropsWithChildren<{}>) => {
  const [isZoom, setZoom] = useState<boolean>(true);
  return (
    <div style={{ minHeight: 14, minWidth: 14, position: 'relative' }}>
      <span
        aria-hidden="true"
        style={{
          cursor: 'pointer', position: 'absolute', right: 0, top: 0,
        }}
        onClick={() => setZoom((pre) => !pre)}
      >
        {
        isZoom ? '展开' : '缩小'
      }
      </span>
      <div
        style={{
          display: isZoom ? 'none' : 'block',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
