export class ThemeManager {

    applyTheme(theme) {

        switch (theme) {
            case 'dark-theme':
                document.body.style.backgroundColor = '#f0f0f0'; // Light gray
                break;
            case 'purple-theme':
                document.body.style.backgroundColor = '#f3e5f5'; // Light purple
                break;
            case 'red-theme':
                document.body.style.backgroundColor = '#ffebee'; // Light red
                break;
            default:
                document.body.style.backgroundColor = '#ffffff'; // Default white
        }

        // Highlight the active theme button
        const themeButtons = [
            document.getElementById('dark-theme-button'),
            document.getElementById('purple-theme-button'),
            document.getElementById('red-theme-button')
        ];

        // Clear selected class from all theme buttons
        themeButtons.forEach(button => {
            if (button) {
                button.classList.remove('selected');
            }
        });

        // Add selected class to the active theme button
        const activeButtonId = `${theme.replace('-theme', '')}-theme-button`;
        const activeButton = document.getElementById(activeButtonId);
        if (activeButton) {
            activeButton.classList.add('selected');
        }
    }
}