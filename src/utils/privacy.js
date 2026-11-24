export function openPrivacyModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-privacy-modal'));
  }
}
