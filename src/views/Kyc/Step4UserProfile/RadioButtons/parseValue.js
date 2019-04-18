export default function parseValue (value) {
  if (value.includes('LessThan')) {
    const parsedValue = value.split('LessThan')[1].split('k')[0] + '.000';
    return `< ${parsedValue} CHF/EUR`;
  }

  if (value.includes('From')) {
    const parsedValues = value
      .split('From')[1]
      .split('to')
      .map(value => value.split('k')[0]);

    return `${parsedValues[0]} - ${parsedValues[1] + '.000'} CHF/EUR`;
  }

  if (value.includes('MoreThan')) {
    const parsedValue = value.split('MoreThan')[1].split('k')[0] + '.000';

    return `> ${parsedValue} CHF/EUR`;
  }
}
