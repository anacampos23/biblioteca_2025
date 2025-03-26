import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (appearance: Appearance) => {
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    // Get appearance from localStorage (already set by the server script)
    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
    // Apply it
    applyTheme(savedAppearance);
    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(initialAppearance: Appearance = 'system') {
    const [appearance, setAppearance] = useState<Appearance>(initialAppearance);

    // Update the appearance in state, localStorage, DOM and on the server
    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem('appearance', mode);
        applyTheme(mode);
        
        // Save to the server (this will persist across devices)
        router.put('/settings/appearance', { appearance: mode });
    }, []);

    // When initialAppearance changes (from props), update state
    useEffect(() => {
        setAppearance(initialAppearance);
    }, [initialAppearance]);

    // Add/remove the event listener for system theme changes
    useEffect(() => {
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    return { appearance, updateAppearance } as const;
}
