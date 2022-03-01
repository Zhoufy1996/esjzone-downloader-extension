interface SchedulerItem<T> {
  result: T | null;
  tryCount: number;
  isResolve: boolean;
  index: number;
  func: () => Promise<T>;
}

interface SchedulerOptions {
  maxCount: number;
  maxTryCount: number;
}

class Scheduler<T> {
  private tempObj: {
    [n: string]: SchedulerItem<T>;
  } = {};

  private maxCount: number = 10;

  private maxTryCount: number = 1;

  constructor(values: (() => Promise<T>)[], { maxCount = 10, maxTryCount = 1 }: SchedulerOptions) {
    this.maxCount = maxCount;
    this.maxTryCount = maxTryCount;

    this.tempObj = Object.fromEntries(
      values.map((func, index) => {
        return [
          index,
          {
            func,
            result: null,
            tryCount: 0,
            isResolve: false,
            index,
          },
        ];
      })
    );
  }

  getNextExecuteList() {
    const { tempObj, maxTryCount, maxCount } = this;
    return Object.values(tempObj)
      .filter((item) => {
        return !item.isResolve && item.tryCount <= maxTryCount;
      })
      .slice(0, maxCount);
  }

  async executeItem(item: SchedulerItem<T>) {
    const { tempObj } = this;
    try {
      const result = await item.func();
      tempObj[item.index] = {
        ...item,
        result,
        isResolve: true,
        tryCount: item.tryCount + 1,
      };
    } catch (e) {
      tempObj[item.index] = {
        ...item,
        tryCount: item.tryCount + 1,
      };
    }
  }

  async execute() {
    return new Promise<T[]>((resolve) => {
      const executeNextList = async () => {
        const nextList = this.getNextExecuteList();
        if (nextList.length === 0) {
          resolve(
            Object.values(this.tempObj)
              .sort((left, right) => {
                return left.index - right.index;
              })
              .map((item) => {
                return item.result as T;
              })
          );
        } else {
          try {
            const nextListPromise = nextList.map((item) => this.executeItem(item));
            await Promise.allSettled(nextListPromise);
          } finally {
            executeNextList();
          }
        }
      };

      executeNextList();
    });
  }

  getResult() {
    const { tempObj } = this;
    return Object.values(tempObj)
      .filter((item) => item.isResolve)
      .map((item) => {
        return {
          index: item.index,
          result: item.result,
        };
      });
  }
}

export default Scheduler;
