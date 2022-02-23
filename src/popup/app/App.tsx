const App = () => (
    <button
        onClick={() => {
            chrome.tabs.query(
                {
                    currentWindow: true,
                    active: true,
                },
                (tabs) => {
                    chrome.tabs.sendMessage(tabs[0]?.id || 0, '');
                }
            );
        }}
        type="button"
    >
        获取
    </button>
);

export default App;
