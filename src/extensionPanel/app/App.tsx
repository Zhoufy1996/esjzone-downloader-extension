const consoleRes = (response:string) => {
  console.log('res: ', response);
};
const App = () => (
  <button
    onClick={() => {
      chrome.tabs.query({
        active: true,
        currentWindow: true,
      }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id || 0,
          'ping',
          consoleRes,
        );
      });
    }}
    type="button"
  >
    ping
  </button>
);

export default App;
