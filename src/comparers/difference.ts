import { HeapComparer } from '../types';

const difference: HeapComparer<number> = (first, second) => second - first;
export default difference;
