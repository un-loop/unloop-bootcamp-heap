import { HeapComparer } from './types';
import { HeapIterator } from './HeapIterator';

/**
 * implementing: https://www.geeksforgeeks.org/binary-heap/
 */
class Heap<T> implements Iterable<T> {
  private _data: T[] = [];
  private _comparer: HeapComparer<T>;

  constructor(comparer: HeapComparer<T>) {
    this._comparer = comparer;
  }

  /**
   * Provides a level-order traversal, not likely sorted
   *
   * @returns {HeapIterator}
   */
  [Symbol.iterator](): Iterator<T> {
    // if we need a sorted iterator, try passing this._data.sort()
    // if sorted iteration is important and common, we should
    // use a different data type
    return new HeapIterator(this._data);
  }

  private swapItems(i: number, j: number) {
    const temp = this._data[i];
    this._data[i] = this._data[j];
    this._data[j] = temp;
  }

  private parent(i: number) {
    return i > 0 ? Math.floor((i - 1) / 2) : 0;
  }

  private left(i: number) {
    const result = 2 * i + 1;
    return result < this._data.length ? result : i;
  }

  private right(i: number) {
    const result = 2 * i + 2;
    return result < this._data.length ? result : i;
  }

  /*
  private minHeapify(i: number) {

    const left = this.left(i);
    const right = this.right(i);
    let smallest = i;

    const inOrder = (j: number) =>
      this._comparer(this._data[smallest], this._data[j]) <= 0;

    if (!inOrder(left)) {
      smallest = left;
    }

    if (!inOrder(right)) {
      smallest = right;
    }

    if (smallest != i) {
      this.swapItems(i, smallest);
      this.minHeapify(smallest);
    }
  }
  */

  private minHeapifyIterative(i: number) {
    const getSmallest = (j: number) => {
      const left = this.left(j);
      const right = this.right(j);
      let smallest = j;

      const inOrder = (k: number) =>
        this._comparer(this._data[smallest], this._data[k]) <= 0;

      if (!inOrder(left)) {
        smallest = left;
      }

      if (!inOrder(right)) {
        smallest = right;
      }

      return smallest;
    };

    let lastValue = i;
    for (
      let smallest = getSmallest(i);
      smallest !== lastValue;
      smallest = getSmallest(smallest)
    ) {
      this.swapItems(lastValue, smallest);
      lastValue = smallest;
    }
  }

  private inOrder(i: number) {
    return this._comparer(this._data[i], this._data[this.parent(i)]) >= 0;
  }

  public insert(item: T) {
    this._data.push(item);

    // heapify
    for (let i = this._data.length - 1; !this.inOrder(i); i = this.parent(i)) {
      this.swapItems(i, this.parent(i));
    }
  }

  public isEmpty() {
    return !this._data.length;
  }

  public peekMin() {
    return this._data[0];
  }

  public extractMin() {
    this.swapItems(0, this._data.length - 1);
    const result = this._data.pop();

    if (this._data.length) {
      this.minHeapifyIterative(0);
    }

    return result;
  }

  public setKey(i: number, value: T) {
    this._data[i] = value;

    // Heapify the subtree
    this.minHeapifyIterative(i);

    // Bubble node up to normalize the entire tree
    while (!this.inOrder(i)) {
      this.swapItems(i, this.parent(i));
      i = this.parent(i);
    }
  }

  // This algorithm differes from geeksforgeeks
  public deleteKey(i: number): T | undefined {
    const last = this._data.pop();
    if (last === undefined) {
      return;
    }

    const toDelete = this._data[i];
    this.setKey(i, last);

    return toDelete;
  }

  public delete(item: T): T | undefined {
    const index = this._data.findIndex((value) => value === item);

    if (index > -1) {
      return this.deleteKey(index);
    }

    return undefined;
  }

  public get size(): number {
    return this._data.length;
  }
}

export default Heap;
