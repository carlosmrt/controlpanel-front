import VueI18n from 'vue-i18n';

export function setupAndGetI18n(Vue, isProduction) {
    Vue.use(VueI18n);

    const i18n = new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        fallbackRoot: false,
        silentTranslationWarn: false,

        missing(locale, key, vm) {
            // TODO
            return key;
        }
    });

    return i18n;
}
