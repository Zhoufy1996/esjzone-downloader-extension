class Log {
  messages: string[] = [];

  addLog(message: string) {
    this.messages.unshift(`【${new Date().toUTCString()}】: ${message}`);
  }

  getLog() {
    return this.messages;
  }

  clean() {
    this.messages = [];
  }
}

export default Log;
