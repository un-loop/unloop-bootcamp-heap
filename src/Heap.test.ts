/* eslint-disable no-undef */
import Heap from './Heap';
import { default as defaultComparer } from './comparers';

it('Can instantiate heap', () => {
  const sut = new Heap(defaultComparer);

  expect(sut).toBeTruthy();
});

it('Empty Heap is empty', () => {
  const sut = new Heap(defaultComparer);

  expect(sut.isEmpty()).toBe(true);
});

it('Heap with one item is not empty', () => {
  const sut = new Heap<string>(defaultComparer);
  const value = 'a';

  sut.insert(value);

  expect(sut.isEmpty()).toBe(false);
  expect(sut.peekMin()).toBe(value);
});

it('Heap with two items is in order', () => {
  const sut = new Heap<string>(defaultComparer);
  const value1 = 'b';
  const value2 = 'a';

  sut.insert(value1);
  sut.insert(value2);

  const min = sut.peekMin();

  expect(min).toBe(min);
});

it('Heap with many items iterates all items', () => {
  const inputSet = new Set(['a', 'b', 'c']);
  const sut = new Heap<string>(defaultComparer);

  inputSet.forEach((value) => sut.insert(value));

  for (const item of sut) {
    inputSet.delete(item);
  }

  expect(inputSet.size).toBe(0);
});

it('extract minimum gets minimum and reduces heap', () => {
  const value1 = 'a';
  const value2 = 'b';

  const sut = new Heap<string>(defaultComparer);
  sut.insert(value1);
  sut.insert(value2);

  const min = sut.extractMin();

  expect(min).toBe(value1);
  expect(sut.size).toBe(1);
});

it('peek minimum when empty returns undefined', () => {
  const sut = new Heap<string>(defaultComparer);

  const min = sut.peekMin();

  expect(min).toBeUndefined();
});

it('extract minimum when empty returns undefined', () => {
  const sut = new Heap<string>(defaultComparer);

  const min = sut.extractMin();

  expect(min).toBeUndefined();
});

it('deletes item', () => {
  const inputSet = new Set(['a', 'b', 'c']);
  const sut = new Heap<string>(defaultComparer);

  inputSet.forEach((value) => sut.insert(value));

  const deleted = sut.delete('b');

  expect(deleted).toBe('b');
  expect(sut.size).toBe(2);
});

it('does not delete when item missing', () => {
  const inputSet = new Set(['a', 'b', 'c']);
  const sut = new Heap<string>(defaultComparer);

  inputSet.forEach((value) => sut.insert(value));

  const deleted = sut.delete('d');

  expect(deleted).toBeUndefined();
  expect(sut.size).toBe(3);
});

it('set key will reoder', () => {
  const inputSet = new Set(['b', 'c', 'd']);
  const sut = new Heap<string>(defaultComparer);

  inputSet.forEach((value) => sut.insert(value));
  sut.setKey(2, 'a');

  expect(sut.peekMin()).toBe('a');
});

it('deleteKey when empty return undefined', () => {
  const sut = new Heap<string>(defaultComparer);

  const deleted = sut.deleteKey(0);

  expect(deleted).toBe(undefined);
});
