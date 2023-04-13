export function validateName(name: string): boolean {
  const regex = /^[a-zA-Z ]{3,20}$/;
  return regex.test(name);
}

//1. validation registration number for indian car number plate system.
export function validateRegistrationNumber(
  registrationNumber: string
): boolean {
  let regex = new RegExp(
    /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
  );

  if (registrationNumber == "") {
    return false;
  }

  if (regex.test(registrationNumber) == true) {
    return true;
  } else {
    return false;
  }
}

//2. alpha numeric validation for car model name
export function validateCarModelName(str: string): boolean {
  let regex = new RegExp(/^[a-z0-9]+([-_\s]{1}[a-z0-9]+)*$/i);

  if (str == null) {
    return false;
  }

  if (regex.test(str) == true) {
    return true;
  } else {
    return false;
  }
}

//3. to check empty fields in registration form.
export function checkEmpty(
  customerName: string,
  carModel: string,
  registrationNumber: string
): boolean {
  if (customerName === "" || carModel === "" || registrationNumber === "")
    return true;

  return false;
}
