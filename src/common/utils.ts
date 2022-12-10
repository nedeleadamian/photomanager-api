export const randomString = (length: number, toUppercase = false): string => {
  let mask = '';
  mask += 'abcdefghjklmnpqrstuvwxyz';
  mask += 'ABCDEFGHJKMNPQRSTUVWXYZ';
  mask += '23456789';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }
  return toUppercase ? result.toUpperCase() : result;
};
