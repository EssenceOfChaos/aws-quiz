import { SubjectNamePipe } from './subject_name.pipe';

describe('Pipe: Default', () => {
  let pipe: SubjectNamePipe;

  beforeEach(() => {
    pipe = new SubjectNamePipe();
  });

  it('returns a proper subject name given design_secure', () => {
    const subject = 'design_secure'
    expect(pipe.transform(subject)).toBe(
      'Design Secure Architectures'
    );
  });

  it('returns a proper subject name given design_resilient', () => {
    const subject = 'design_resilient'
    expect(pipe.transform(subject)).toBe(
      'Design Resilient Architectures'
      );
  });

  it('returns a proper subject name given design_performant', () => {
    const subject = 'design_performant'
    expect(pipe.transform(subject)).toBe(
      'Design Performant Architectures'
      );
  });

  it('returns a proper subject name given design_cost_optimized', () => {
    const subject = 'design_cost_optimized'
    expect(pipe.transform(subject)).toBe(
      'Design Cost-Optimized Architectures'
      );
  });

    it('returns a proper subject name given practice_test', () => {
    const subject = 'practice_test'
    expect(pipe.transform(subject)).toBe(
      'Practice Test'
      );
  });

});
