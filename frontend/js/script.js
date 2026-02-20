document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const originalTextInput = document.getElementById('original-text');
    const convertedTextOutput = document.getElementById('converted-text');
    const convertBtn = document.getElementById('convert-btn');
    const copyBtn = document.getElementById('copy-btn');
    const charCounter = document.getElementById('char-counter');
    const toast = document.getElementById('toast');

    // API Endpoint
    const API_URL = 'http://127.0.0.1:5000/api/convert';

    // --- Event Listeners ---

    // 1. Convert Button Click
    convertBtn.addEventListener('click', handleConvert);

    // 2. Character Counter on Input
    originalTextInput.addEventListener('input', updateCharCounter);

    // 3. Copy Button Click
    copyBtn.addEventListener('click', handleCopy);

    // --- Functions ---

    /**
     * Handles the text conversion process by calling the backend API.
     */
    async function handleConvert() {
        const text = originalTextInput.value.trim();
        const selectedTarget = document.querySelector('input[name="target"]:checked');

        if (!text) {
            showToast('변환할 내용을 입력해주세요.', 'error');
            return;
        }

        if (!selectedTarget) {
            showToast('변환 대상을 선택해주세요.', 'error');
            return;
        }

        const target = selectedTarget.value;
        toggleLoading(true);

        const bodyData = JSON.stringify({ text, target });
        console.log('Sending request to:', API_URL);
        console.log('Request body:', bodyData);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '알 수 없는 오류가 발생했습니다.');
            }

            const data = await response.json();
            updateResult(data.converted_text);

        } catch (error) {
            console.error('Conversion Error:', error);
            displayError('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            showToast(error.message, 'error');
        } finally {
            toggleLoading(false);
        }
    }

    /**
     * Handles copying the converted text to the clipboard.
     */
    function handleCopy() {
        const resultText = convertedTextOutput.innerText;
        const placeholder = document.querySelector('.converted-text-wrapper .placeholder');

        if (!resultText || placeholder) {
            showToast('복사할 내용이 없습니다.', 'error');
            return;
        }

        navigator.clipboard.writeText(resultText)
            .then(() => {
                showToast('텍스트가 클립보드에 복사되었습니다.', 'success');
            })
            .catch(err => {
                console.error('Copying failed:', err);
                showToast('복사에 실패했습니다.', 'error');
            });
    }

    /**
     * Updates the character counter display.
     */
    function updateCharCounter() {
        const currentLength = originalTextInput.value.length;
        const maxLength = originalTextInput.maxLength;
        charCounter.textContent = `${currentLength} / ${maxLength}`;
    }

    /**
     * Toggles the loading state of the convert button.
     * @param {boolean} isLoading - Whether to show or hide the loading spinner.
     */
    function toggleLoading(isLoading) {
        if (isLoading) {
            convertBtn.classList.add('loading');
            convertBtn.disabled = true;
        } else {
            convertBtn.classList.remove('loading');
            convertBtn.disabled = false;
        }
    }
    
    /**
     * Displays the converted text in the output area.
     * @param {string} convertedText - The text to display.
     */
    function updateResult(convertedText) {
        convertedTextOutput.innerHTML = ''; // Clear previous content
        const p = document.createElement('p');
        p.textContent = convertedText;
        convertedTextOutput.appendChild(p);
    }
    
    /**
     * Displays an error message in the output area.
     * @param {string} message - The error message to display.
     */
    function displayError(message) {
        convertedTextOutput.innerHTML = ''; // Clear previous content
        const p = document.createElement('p');
        p.className = 'placeholder';
        p.style.color = 'var(--error-color)';
        p.textContent = message;
        convertedTextOutput.appendChild(p);
    }

    /**
     * Shows a toast notification.
     * @param {string} message - The message to display.
     * @param {string} type - 'success' or 'error' for styling.
     */
    function showToast(message, type = '') {
        toast.textContent = message;
        toast.className = 'toast-notification'; // Reset classes
        if (type) {
            toast.classList.add(type);
        }
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
