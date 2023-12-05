import { DatePipe, DecimalPipe } from '@angular/common';
import { FormatCifrasPipe } from './format-cifras.pipe';

describe('FormatCifrasPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatCifrasPipe(new DecimalPipe("es"));
    expect(pipe).toBeTruthy();
  });
});
