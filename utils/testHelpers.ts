// NavigationMock.ts
export interface Navigation {
  addListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void;
}

export class NavigationMock implements Navigation {
  public listeners: Map<string, Set<EventListenerOrEventListenerObject>> =
    new Map();

  addListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  removeListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  triggerEvent(type: string) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach((listener) => {
        if (typeof listener === "function") {
          listener(new Event(type));
        } else {
          listener.handleEvent(new Event(type));
        }
      });
    }
  }
  reset(type: string) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach((listener) => {
        if (typeof listener === "function") {
          listener(new Event(type));
        } else {
          listener.handleEvent(new Event(type));
        }
      });
    }
  }
  navigate(type: string) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach((listener) => {
        if (typeof listener === "function") {
          listener(new Event(type));
        } else {
          listener.handleEvent(new Event(type));
        }
      });
    }
  }
}
