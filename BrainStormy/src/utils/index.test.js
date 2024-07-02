import {
  timeConverter,
  calculateGrade,
  getOption,
  calculateScore,
} from '../utils';

describe('timeConverter', () => {
  it('returns minutes and seconds on valid input', () => {
    expect(timeConverter(1000 * 60)).toMatchObject({
      minutes: '01',
      seconds: '00',
    });
  });

  it('returns null on invalid input', () => {
    expect(timeConverter('ss')).toBeNull();
  });
});

describe('calculateGrade', () => {
  it('returns A+ and you pass for any grade >= 97 on valid input', () => {
    expect(calculateGrade(97)).toMatchObject({
      grade: 'A+',
      remarks: `Outstanding! You've mastered this quiz. Well done!`,
    });
  });

  it('returns A and you pass for any grade >= 93 <= 96 on valid input', () => {
    expect(calculateGrade(96)).toMatchObject({
      grade: 'A',
      remarks: `Outstanding! You've mastered this quiz. Well done!`,
    });
    expect(calculateGrade(93)).toMatchObject({
      grade: 'A',
      remarks: `Outstanding! You've mastered this quiz. Well done!`,
    });
  });

  it('returns A- and you pass for any grade >= 90 <= 92 on valid input', () => {
    expect(calculateGrade(90)).toMatchObject({
      grade: 'A-',
      remarks: `Outstanding! You've mastered this quiz. Well done!`,
    });
    expect(calculateGrade(92)).toMatchObject({
      grade: 'A-',
      remarks: `Outstanding! You've mastered this quiz. Well done!`,
    });
  });

  it('returns null on invalid input', () => {
    expect(calculateGrade([1, 2])).toBeNull();
  });
});

describe('getOption', () => {
  it('returns a letter based on valid input', () => {
    expect(getOption(0)).toEqual('A.');
    expect(getOption(1)).toEqual('B.');
    expect(getOption(2)).toEqual('C.');
    expect(getOption(3)).toEqual('D.');
  });

  it('returns null on invalid input', () => {
    expect(getOption(4)).toBeNull();
  });
});

describe('calculateScore', () => {
  it('returns score on valid input', () => {
    expect(calculateScore(200, 100)).toEqual(50);
  });

  it('returns null on invalid input', () => {
    expect(calculateScore(0, 0)).toEqual(0);
  });
});
