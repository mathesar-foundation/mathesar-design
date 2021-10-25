var themes = {
    darkTheme: {
        backgroundColor: 'bg-gray-900',
        mediumBackgroundColor: 'bg-gray-700',
        accentBackgroundColor: 'bg-gray-700',
        lightBackgroundColor: 'bg-gray-200',
        darkBorderColor: 'border-gray-800',
        mediumBorderColor: 'border-gray-500',
        lightBorderColor: 'border-gray-500',
        textColor: 'text-gray-100',
        inverseTextColor: 'text-dark',
        mutedTextColor: 'text-gray-400',
        mediumTextColor: 'text-gray-200',
        tableBorderColor: 'border-gray-700',
        tableBackgroundColor: 'bg-gray-800',
        tableHeaderBackgroundColor: 'bg-gray-800',
        primaryColor: 'bg-indigo-400',
        primaryBorderColor: 'border-indigo-300',
        inputBackgroundColor: 'bg-gray-800',
        darkPrimaryColor: 'bg-indigo-900',
        primaryTextColor: 'text-indigo-300'
    },
    lightTheme: {
        backgroundColor: 'bg-white',
        mediumBackgroundColor: 'bg-gray-200',
        accentBackgroundColor: 'bg-white',
        lightBackgroundColor: 'bg-gray-50',
        darkBorderColor: 'border-gray-600',
        mediumBorderColor: 'border-gray-300',
        lightBorderColor: 'border-gray-400',
        textColor: 'text-gray-600',
        inverseTextColor: 'text-white',
        mutedTextColor: 'text-gray-500',
        mediumTextColor: 'text-gray-700',
        tableBorderColor: 'border-gray-300',
        tableBackgroundColor: 'bg-white',
        tableHeaderBackgroundColor: 'bg-white',
        primaryColor: 'bg-indigo-400',
        primaryBorderColor: 'border-indigo-300',
        inputBackgroundColor: 'bg-gray-100',
        darkPrimaryColor: 'bg-indigo-300',
        primaryTextColor: 'text-indigo-400'
    }
};

var theme = themes.darkTheme;
var activeTheme = window.sessionStorage.getItem('activeTheme');
if (activeTheme) {
    theme = themes[activeTheme];
}

function setNextTheme() {
    let list = Object.keys(themes);
    let idx = activeTheme?list.indexOf(activeTheme):0;
    let newTheme = list[(idx+1)%list.length];
    setTheme(newTheme);
}

function setTheme(_theme) {
    window.sessionStorage.setItem('activeTheme',_theme);
    location.reload();
}

module.exports = { theme, themes, setTheme, setNextTheme };