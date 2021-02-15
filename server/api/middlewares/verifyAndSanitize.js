export function verifitizeName(str) {
  let name = str.toLowerCase();
  let isVerfied = true;
  let sanitizedName = '';

  // verify data
  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    if ((char >= 'a' && char <= 'z') || char === ' ') {
      continue;
    } else {
      isVerfied = false;
      break;
    }
  }

  if (isVerfied) {
    // sanitize data
    name.split(' ').forEach((item) => {
      const currentWord = item.charAt(0).toUpperCase() + item.substring(1, item.length);
      if (sanitizedName === '') {
        sanitizedName = currentWord;
      } else {
        sanitizedName += ' ' + currentWord;
      }
    });

    return sanitizedName;
  } else {
    return false;
  }
}
