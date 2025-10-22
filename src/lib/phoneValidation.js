/**
 * Validates and formats Bangladeshi phone numbers
 * Accepts: 01XXXXXXXXX or +8801XXXXXXXXX or 8801XXXXXXXXX
 * Returns: +8801XXXXXXXXX (with country code)
 */
export const validateBDPhone = (phone) => {
  let cleaned = phone.replace(/[\s-]/g, '');

  if (cleaned.startsWith('+88')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('88')) {
    cleaned = cleaned.substring(2);
  }

  const bdPhoneRegex = /^01[3-9]\d{8}$/;

  if (!bdPhoneRegex.test(cleaned)) {
    return {
      isValid: false,
      formatted: null,
      error: 'Invalid Bangladesh phone number.'
    };
  }

  return {
    isValid: true,
    formatted: `+88${cleaned}`,
    error: null
  };
};


// format phone for display
export const formatPhoneDisplay = (phone) => {
  if (!phone) return '';

  // if stored as +8801XXXXXXXXX, format as +880 1XXX-XXXXXX
  if (phone.startsWith('+880')) {
    const number = phone.substring(4);
    return `+880 ${number.substring(0, 4)}-${number.substring(4)}`;
  }

  return phone;
};