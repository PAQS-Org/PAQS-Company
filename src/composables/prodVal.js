// import useVuelidate from '@vuelidate/core';
import {
  required, minValue, maxValue, minLength, maxLength,
} from '@vuelidate/validators';

export const validateProdInfo = () => ({
  prodName: { required, minLength: minLength(3), maxLength: maxLength(50) },
  prodLogo: { required },
  qrType: { required },
  quantity: { required, minValue: minValue(200), maxValue: maxValue(100000) },
});

export const createErrorMessage = (field, error) => {
  // Define error message logic based on field and error type
  // This example uses generic error messages
  switch (field) {
    case 'prodName':
      return error.required ? 'Name of the product is required.' : 'Name must be between 3 and 50 characters.';
    case 'prodLogo':
      return 'Product Logo is required.';
    case 'qrType':
      return 'QR code type is required.';
    case 'quantity':
      return error.required
        ? 'Quantity of the product is required.'
        : error.minValue
          ? 'The quantity must not be less than 200.'
          : 'The quantity must not be more than 100,000.';
    default:
      return 'An error occurred.';
  }
};
