const getDefaultLanguage = () => {
    const navLanguage = navigator.language.toUpperCase();
    const language =    window.localStorage.getItem('language') 
                    ||  (navLanguage.includes('EN') && 'EN')
                    ||  'ES';
    
    return language;
}

export { getDefaultLanguage }