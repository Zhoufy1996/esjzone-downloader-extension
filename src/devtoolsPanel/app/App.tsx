import { useState } from 'react';

const App = () => {
  const [urls, setUrls] = useState<string[]>([]);
  return (
    <div>
      <h2>devtools panel</h2>
      <div>
        <button
          type="button"
          onClick={() => {
            chrome.devtools.network.getHAR((har) => {
              setUrls(har.entries.map((entry) => entry.request.url));
            });
          }}
        >
          getHAR
        </button>
      </div>
      {
        urls.length > 0 ? (
          <div>
            <h3>urls</h3>
            {urls.map((url) => (
              <div key={url}>{url}</div>
            ))}
          </div>
        ) : (
          <div>
            none
          </div>
        )
      }
    </div>
  );
};

export default App;
