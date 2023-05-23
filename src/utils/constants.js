// export const BASE_URL = 'http://localhost:7777';
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7777'
    : 'https://fluoridated-sugared-teal.glitch.me';

export const URL_BEATFILM = 'https://api.nomoreparties.co/beatfilm-movies';

export const NOT_FOUND_CODE = 404;
export const BAD_REQUEST_CODE = 400;
export const SERVER_ERROR_CODE = 500;
export const OK_CODE = 200;
export const UNAUTHORIZED = 401;
export const SALT = 10;

export const MAX_SHORTS_DURATION = 40;
export const NOT_FOUND_MESSAGE = "Ничего не найдено";
export const MOVVIES_MESSAGE = "Ошибка. Проверьте подключение или попробуйте позже";

export const MAX_MOVIES= 5;
export const MAX_MOVIES_1280 = 12;
export const MAX_MOVIES_1000 = 9;
export const MAX_MOVIES_768 = 8;

export const MAX_MOVIES_STEP = 2;
export const MAX_MOVIES_STEP_1280 = 4;
export const MAX_MOVIES_STEP_1000 = 3;
