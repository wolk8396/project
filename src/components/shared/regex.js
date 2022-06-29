export const REGEX = {
    email: /^\w{4,}@\w{4,}\.\w{2,4}$/,
    password_length: /^.{8,}$/,
    upper_case: /(?=.*[A-Z])/,
    lower_case: /(?=.*[a-z])/,
    numbers: /(?=.*\d)/,
    EIGHT_CHARACTERS: /[a-zA-Z\d@$#!%?&*^()-=+_]{8,}/,
    check: /^([a-z]){1,}/
}
