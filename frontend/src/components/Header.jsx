import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">DotNotes</h1>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 hidden sm:block">
                {t("welcome", { name: user?.name })}
              </span>

              <LanguageSwitcher />

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                aria-label="Sign Out"
                title="Sign Out"
              >
                {t("signout")}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
