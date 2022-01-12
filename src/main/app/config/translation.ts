import { TranslatorContext, Storage } from "react-jhipster";

import { setLocale } from "../shared/reducers/locale";

TranslatorContext.setDefaultLocale("tr");
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: "English" },
  tr: { name: "Türkçe" },
};

export const locales = Object.keys(languages).sort();

export const registerLocale = (store) => {
  store.dispatch(setLocale(Storage.session.get("locale", "tr")));
};
