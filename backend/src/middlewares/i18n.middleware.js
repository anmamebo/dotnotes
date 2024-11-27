const i18n = require("../config/i18n");

const i18nMiddleware = (req, res, next) => {
  // Obtain the language from the request headers
  const userLang =
    req.headers["accept-language"]
      ?.split(",")[0] // Take the first language from the list
      .split("-")[0] || // Take the first part of the language code
    "en"; // Default language

  i18n.changeLanguage(userLang);
  next();
};

module.exports = i18nMiddleware;
