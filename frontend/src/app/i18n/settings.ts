export const defaultLanguage = 'en'
export const availableLanguages = [defaultLanguage, 'ja']
export const namespaces = ['translation', 'top', 'lottery']

export function getOptions(lng = defaultLanguage) {
  return {
    lng,
    defaultNS: defaultLanguage,
    fallbackLng: defaultLanguage,
    fallbackNS: namespaces[0],
    ns: namespaces,
    supportedLngs: availableLanguages,
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span'],
    },
  }
}
