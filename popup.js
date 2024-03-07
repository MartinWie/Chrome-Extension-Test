document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');

    // Function to update button appearance
    function updateButtonAppearance(isEnabled) {
        toggleButton.textContent = isEnabled ? 'Disable Modification' : 'Enable Modification';
        if (isEnabled) {
            toggleButton.classList.remove('off');
        } else {
            toggleButton.classList.add('off');
        }
    }

    // Initialize button appearance based on stored state
    chrome.storage.local.get('isModificationEnabled', (data) => {
        updateButtonAppearance(data.isModificationEnabled);
    });

    // Toggle button functionality
    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get('isModificationEnabled', (data) => {
            const isEnabled = !data.isModificationEnabled;
            chrome.storage.local.set({ 'isModificationEnabled': isEnabled }, () => {
                updateButtonAppearance(isEnabled);
                chrome.runtime.sendMessage({ toggleChanged: isEnabled });
            });
        });
    });
});
