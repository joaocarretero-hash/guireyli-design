const emailCopyButtons = document.querySelectorAll('[data-copy-email]');
const copyToast = document.querySelector('.copy-toast');
let copyToastTimeout;

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
    }
  }

  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, field.value.length);
  const copied = document.execCommand('copy');
  field.remove();

  if (!copied) {
    throw new Error('Clipboard copy failed');
  }
}

function showCopyToast(message, isError = false) {
  copyToast.textContent = message;
  copyToast.classList.toggle('is-error', isError);
  copyToast.classList.add('is-visible');
  window.clearTimeout(copyToastTimeout);
  copyToastTimeout = window.setTimeout(() => {
    copyToast.classList.remove('is-visible');
  }, 2600);
}

emailCopyButtons.forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await copyText(button.dataset.copyEmail);
      showCopyToast('E-mail copiado para a área de transferência.');
    } catch {
      showCopyToast('Não foi possível copiar o e-mail.', true);
    }
  });
});