import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
    const { subscribe, set, update } = writable('light');

    return {
        subscribe,
        set: (theme: string) => {
            if (browser) {
                localStorage.setItem('current-theme', theme);
                document.documentElement.setAttribute('data-theme', theme);
            }
            set(theme);
        },
        initialize: () => {
            if (browser) {
                const storedTheme = localStorage.getItem('current-theme');
                if (storedTheme) {
                    set(storedTheme);
                    document.documentElement.setAttribute('data-theme', storedTheme);
                }
            }
        }
    };
}

export const theme = createThemeStore();
