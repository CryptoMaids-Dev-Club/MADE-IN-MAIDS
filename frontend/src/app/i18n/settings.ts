export const defaultLanguage = 'en'
export const availableLanguages = [defaultLanguage, 'ja']

export const namespaces = ['translation', 'top']

export function getOptions(lng = defaultLanguage) {
  return {
    lng,
    defaultNS: defaultLanguage,
    fallbackLng: defaultLanguage,
    fallbackNS: namespaces[0],
    ns: namespaces,
    supportedLngs: availableLanguages,
  }
}
