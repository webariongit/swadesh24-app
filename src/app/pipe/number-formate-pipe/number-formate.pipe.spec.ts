import { NumberFormatePipe } from './number-formate.pipe';

describe('NumberFormatePipe', () => {
  it('create an instance', () => {
    const pipe = new NumberFormatePipe();
    expect(pipe).toBeTruthy();
  });
});
