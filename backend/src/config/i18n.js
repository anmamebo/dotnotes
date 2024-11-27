const i18next = require("i18next");
const i18nextFsBackend = require("i18next-fs-backend");
const path = require("path");

i18next.use(i18nextFsBackend).init({
  fallbackLng: "en", // Idioma por defecto
  lng: "en", // Idioma inicial
  supportedLngs: ["en", "es"], // Idiomas soportados
  backend: {
    loadPath: path.join(__dirname, "../../locales/{{lng}}/translation.json"),
  },
});

module.exports = i18next;
