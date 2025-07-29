import { LinkedList } from "./linkedList";
export const greeting = "Hello, Odinite!";

export class Hashmap {
  constructor(capacity, size = 16) {
    this.loadFactor = 0.75;
    this.capacity = capacity;
    this.buckets = new Array(size);
    this.size = size;
  }

  hash(key) {
    if (typeof key !== "string") key = toString(key);
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }
    this.buckets[index].prepend(key, value);

    this.capacity = this.length() / this.buckets.length;

    if (this.loadFactor < this.length() / this.buckets.length) {
      this.resize();
    }
  }

  remove(key) {
    let index = this.hash(key);

    if (!this.buckets[index]) return false;
    this.buckets[index].delete(key);

    if (this.buckets[index].size === 0) {
      this.buckets[index] = undefined;
    }
    return true;
  }
  has(key) {
    let index = this.hash(key);

    if (!this.buckets[index]) return false;
    return this.buckets[index].contains(key);
  }

  get(key) {
    let index = this.hash(key);

    if (!this.buckets[index]) return null;
    return this.buckets[index].find(key);
  }
  length() {
    let sum = 0;
    for (let bucket of this.buckets) {
      if (bucket) {
        sum += bucket.size;
      }
    }
    return sum;
  }

  keys() {
    const keysArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        let current = bucket.head;

        while (current) {
          keysArray.push(current.key);
          current = current.nextNode;
        }
      }
    }
    return keysArray;
  }
  values() {
    const valuesArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        let current = bucket.head;

        while (current) {
          valuesArray.push(current.data);
          current = current.nextNode;
        }
      }
    }
    return valuesArray;
  }
  entries() {
    const entriesArray = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        let current = bucket.head;

        while (current) {
          const tempArray = [];
          tempArray.push(current.key);
          tempArray.push(current.data);
          entriesArray.push(tempArray);
          current = current.nextNode;
        }
      }
    }
    return entriesArray;
  }

  clear() {
    for (let bucket of this.buckets) {
      if (bucket) {
        bucket.clear();
      }
    }
  }

  resize() {
    console.log("testing resize trigger");
    const savedBuckets = this.buckets;
    this.size *= 2;
    this.buckets = new Array(this.size);

    for (let bucket of savedBuckets) {
      if (bucket) {
        let current = bucket.head;

        while (current) {
          this.set(current.key, current.data);
          current = current.nextNode;
        }
      }
    }
  }
}
