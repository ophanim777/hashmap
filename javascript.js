class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

    checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
}

 set(key, value) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // overwrite
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return null;
  }

   has(key) {
    return this.get(key) !== null;
  }

   remove(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

   clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

   keys() {
    const keysArray = [];

    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        keysArray.push(pair[0]);
      }
    }

    return keysArray;
  }


   values() {
    const valuesArray = [];

    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        valuesArray.push(pair[1]);
      }
    }

    return valuesArray;
  }

   resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let pair of bucket) {
        this.set(pair[0], pair[1]);
      }
    }
  }
}