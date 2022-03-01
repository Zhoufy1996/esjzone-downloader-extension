class Log {
  messages: string[] = [];

  addLog(message: string) {
    this.messages.push(`【${new Date().toUTCString()}】: ${message}`);
  }

  getLog() {
    return this.messages;
  }

  clean() {
    this.messages = [];
  }
}

export default Log;
