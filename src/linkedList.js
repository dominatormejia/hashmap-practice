class Node {
  constructor(key, data = null, nextNode = null) {
    this.key = key;
    this.data = data;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(key, data) {
    let current = this.head;

    while (current) {
      if (current.key === key) {
        current.data = data;
        return;
      }
      current = current.nextNode;
    }

    this.head = new Node(key, data, this.head);
    this.size++;
  }

  contains(key) {
    if (!this.head) return false;
    let current = this.head;

    while (current) {
      if (current.key === key) return true;
      current = current.nextNode;
    }
    return false;
  }

  find(key) {
    if (!this.head) return null;

    let current = this.head;

    while (current) {
      if (current.key === key) return current.data;
      current = current.nextNode;
    }
    return null;
  }

  delete(key) {
    if (!this.head) return;

    if (this.head.key === key) {
      this.head = this.head.nextNode;
      this.size--;
      return;
    }

    let current = this.head;

    while (current.nextNode) {
      if (current.nextNode.key === key) {
        current.nextNode = current.nextNode.nextNode;
        this.size--;
        return;
      }
      current = current.nextNode;
    }
  }
  clear() {
    this.head = null;
    this.size = 0;
  }
}
