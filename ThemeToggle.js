import {PREFERS_DARK_SCHEME, DARK, LIGHT, LIGHT_MODE, DARK_MODE, THEME} from './constants.js';

export class ThemeToggle {
    #toggleButton;

    constructor() {
        this.#toggleButton = document.querySelector('.btn-toggle');

        const initThemeValue = this.#detInitThemeValue();

        document.body.dataset.theme = initThemeValue;

        this.#updateThemeToggleButton(initThemeValue);

        this.#toggleButton.addEventListener('click', this.#toggleTheme);
    }

    #detInitThemeValue = () => {
        const preSettledThemeValue = localStorage.getItem(THEME);
        const prefersDarkScheme = window.matchMedia(PREFERS_DARK_SCHEME);

        if (preSettledThemeValue) {
            return preSettledThemeValue;
        }

        if (prefersDarkScheme.matches) {
            return DARK;
        }

        return LIGHT;
    }

    #updateThemeToggleButton = (theme) => {
        const buttonText = theme === DARK ? LIGHT_MODE : DARK_MODE;
        this.#toggleButton.setAttribute('aria-label', buttonText);
        this.#toggleButton.innerText = buttonText;
    }

    #toggleTheme = () => {
        const newTheme = document.body.dataset.theme === DARK ? LIGHT : DARK;

        this.#updateThemeToggleButton(newTheme);

        document.body.dataset.theme = newTheme;

        localStorage.setItem(THEME, newTheme);
    }
}
