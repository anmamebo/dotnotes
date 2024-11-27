import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      {/* English */}
      <button
        onClick={() => changeLanguage("en")}
        aria-label={t("languageSwitcher.english")}
        title={t("languageSwitcher.english")}
      >
        <img
          src="/flags/en.png"
          alt={t("languageSwitcher.english")}
          className="w-6 h-6 rounded-full"
        />
      </button>

      {/* Spanish */}
      <button
        onClick={() => changeLanguage("es")}
        aria-label={t("languageSwitcher.spanish")}
        title={t("languageSwitcher.spanish")}
      >
        <img
          src="/flags/es.png"
          alt={t("languageSwitcher.spanish")}
          className="w-6 h-6 rounded-full"
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
