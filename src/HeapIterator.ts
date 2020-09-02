export class HeapIterator<T> implements Iterator<T> {
  private _data: T[];
  private _index = -1;

  constructor(data: T[]) {
    this._data = data;
  }

  public next(): IteratorResult<T> {
    if (this._index === this._data.length) {
      throw new Error('Iteration is exhausted');
    }

    return ++this._index < this._data.length
      ? {
          done: false,
          value: this._data[this._index],
        }
      : {
          done: true,
          value: this._data[this._index],
        };
  }
}
