export let themes = {
    darkTheme: {
        backgroundColor: 'bg-gray-900',
        mediumBackgroundColor: 'bg-gray-700',
        darkBackgroundColor: 'bg-gray-800',
        accentBackgroundColor: 'bg-gray-700',
        lightBackgroundColor: 'bg-gray-600',
        darkBorderColor: 'border-opacity-0',
        mediumBorderColor: 'border-gray-500',
        lightBorderColor: 'border-gray-500',
        textColor: 'text-gray-100',
        inverseTextColor: 'text-gray-900',
        mutedTextColor: 'text-gray-400',
        mediumTextColor: 'text-gray-200',
        tableBorderColor: 'border-gray-700',
        tableBackgroundColor: 'bg-gray-800',
        tableHeaderBackgroundColor: 'bg-gray-800',
        primaryColor: 'bg-zinc-400',
        primaryBorderColor: 'border-zinc-300',
        inputBackgroundColor: 'bg-gray-700',
        darkPrimaryColor: 'bg-zinc-900',
        primaryTextColor: 'text-zinc-400',
        contrastTextColor: 'text-zinc-400'
    },
    lightTheme: {
        backgroundColor: 'bg-white',
        mediumBackgroundColor: 'bg-gray-200',
        darkBackgroundColor: 'bg-gray-50',
        accentBackgroundColor: 'bg-white',
        lightBackgroundColor: 'bg-gray-50',
        darkBorderColor: 'border-opacity-0',
        mediumBorderColor: 'border-gray-300',
        lightBorderColor: 'border-gray-400',
        textColor: 'text-gray-700',
        inverseTextColor: 'text-white',
        mutedTextColor: 'text-gray-500',
        mediumTextColor: 'text-gray-700',
        tableBorderColor: 'border-gray-300',
        tableBackgroundColor: 'bg-white',
        tableHeaderBackgroundColor: 'bg-white',
        primaryColor: 'bg-green-400',
        primaryBorderColor: 'border-green-300',
        inputBackgroundColor: 'bg-gray-400',
        darkPrimaryColor: 'bg-green-400',
        primaryTextColor: 'text-green-500',
        contrastTextColor: 'text-indigo-400'
    },pinkTheme: {
        backgroundColor: 'bg-rose-50',
        mediumBackgroundColor: 'bg-rose-100',
        darkBackgroundColor: 'bg-rose-100',
        accentBackgroundColor: 'bg-white',
        lightBackgroundColor: 'bg-gray-50',
        darkBorderColor: 'border-opacity-0',
        mediumBorderColor: 'border-gray-300',
        lightBorderColor: 'border-gray-400',
        textColor: 'text-gray-800',
        inverseTextColor: 'text-white',
        mutedTextColor: 'text-gray-500',
        mediumTextColor: 'text-gray-700',
        tableBorderColor: 'border-pink-200',
        tableBackgroundColor: 'bg-white',
        tableHeaderBackgroundColor: 'bg-white',
        primaryColor: 'bg-rose-500',
        primaryBorderColor: 'border-pink-300',
        inputBackgroundColor: 'bg-rose-400',
        darkPrimaryColor: 'bg-rose-300',
        primaryTextColor: 'text-pink-500',
        contrastTextColor: 'text-yellow-900'
    },pmTheme: {
        backgroundColor: 'bg-white',
        mediumBackgroundColor: 'bg-zinc-300',
        darkBackgroundColor: 'bg-zinc-50',
        accentBackgroundColor: 'bg-white',
        lightBackgroundColor: 'bg-zinc-200',
        darkBorderColor: 'border-zinc-200',
        mediumBorderColor: 'border-zinc-300',
        lightBorderColor: 'border-zinc-300',
        textColor: 'text-zinc-800',
        inverseTextColor: 'text-white',
        mutedTextColor: 'text-zinc-500',
        mediumTextColor: 'text-zinc-700',
        tableBorderColor: 'border-zinc-300',
        tableBackgroundColor: 'bg-white',
        tableHeaderBackgroundColor: 'bg-white',
        primaryColor: 'bg-indigo-500',
        primaryBorderColor: 'border-zinc-800',
        inputBackgroundColor: 'bg-zinc-50',
        darkPrimaryColor: 'bg-zinc-100',
        primaryTextColor: 'text-indigo-600',
        contrastTextColor: 'text-indigo-900'
    }
};

export let theme = themes.pmTheme;

//
//export var activeTheme = window.sessionStorage.getItem('activeTheme');
//if (activeTheme) {
//    theme = themes[activeTheme];
//}
//
//export function setNextTheme() {
//    let list = Object.keys(themes);
//    let idx = activeTheme?list.indexOf(activeTheme):0;
//    let newTheme = list[(idx+1)%list.length];
//    setTheme(newTheme);
//}
//
//export function setTheme(_theme) {
//    window.sessionStorage.setItem('activeTheme',_theme);
//    location.reload();
//}



//export default { theme, themes, setTheme, setNextTheme };