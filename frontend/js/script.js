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
        const isPlaceholder = convertedTextOutput.querySelector('.placeholder');

        if (!resultText || isPlaceholder) {
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
     */
    function toggleLoading(isLoading) {
        const buttonText = convertBtn.querySelector('span');
        const buttonIcon = convertBtn.querySelector('svg');
        const spinner = convertBtn.querySelector('.animate-spin');

        if (isLoading) {
            convertBtn.disabled = true;
            convertBtn.classList.add('opacity-80', 'cursor-not-allowed');
            if (buttonText) buttonText.classList.add('hidden');
            if (buttonIcon) buttonIcon.classList.add('hidden');
            if (spinner) spinner.classList.remove('hidden');
        } else {
            convertBtn.disabled = false;
            convertBtn.classList.remove('opacity-80', 'cursor-not-allowed');
            if (buttonText) buttonText.classList.remove('hidden');
            if (buttonIcon) buttonIcon.classList.remove('hidden');
            if (spinner) spinner.classList.add('hidden');
        }
    }
    
    /**
     * Displays the converted text in the output area.
     */
    function updateResult(convertedText) {
        convertedTextOutput.innerHTML = ''; // Clear previous content
        const p = document.createElement('p');
        p.className = 'text-slate-700 leading-relaxed whitespace-pre-wrap';
        p.textContent = convertedText;
        convertedTextOutput.appendChild(p);
    }
    
    /**
     * Displays an error message in the output area.
     */
    function displayError(message) {
        convertedTextOutput.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-red-400 gap-3">
                <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="placeholder text-sm font-medium">${message}</p>
            </div>
        `;
    }

    /**
     * Shows a toast notification.
     */
    function showToast(message, type = '') {
        const messageEl = toast.querySelector('.toast-message');
        const iconEl = toast.querySelector('.toast-icon');
        
        messageEl.textContent = message;
        
        // Reset classes
        toast.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 translate-y-20 px-6 py-3 rounded-xl shadow-2xl text-sm font-medium opacity-0 invisible transition-all duration-500 ease-out z-50 flex items-center gap-2';
        iconEl.innerHTML = '';

        if (type === 'success') {
            toast.classList.add('bg-emerald-600', 'text-white');
            iconEl.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        } else if (type === 'error') {
            toast.classList.add('bg-rose-600', 'text-white');
            iconEl.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        } else {
            toast.classList.add('bg-slate-900', 'text-white');
        }
        
        // Show
        toast.classList.remove('opacity-0', 'invisible', 'translate-y-20');
        toast.classList.add('opacity-100', 'visible', 'translate-y-0');

        setTimeout(() => {
            // Hide
            toast.classList.remove('opacity-100', 'visible', 'translate-y-0');
            toast.classList.add('opacity-0', 'invisible', 'translate-y-20');
        }, 3000);
    }
});
