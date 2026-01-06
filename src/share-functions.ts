import { openUrl } from "./utils";

export function shareToWhatsApp(url: string, text: string) {
  const encoded = encodeURIComponent(`${text}\n${url}`);
  openUrl(`https://api.whatsapp.com/send?text=${encoded}`);
}

export function shareToTelegram(url: string, text: string) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  openUrl(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`);
}

export function shareToX(url: string, text: string) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  openUrl(`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`);
}

export function shareToFacebook(url: string) {
  const encodedUrl = encodeURIComponent(url);
  openUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
}

export function openInstagram() {
  window.location.href = "instagram://";
}

export function openTikTok() {
  window.location.href = "tiktok://";
}

export function openThreads() {
  window.location.href = "threads://";
}

export function shareToSnapchat(url: string) {
  const encodedUrl = encodeURIComponent(url);
  openUrl(`https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`);
}

export function shareViaSMS(url: string, text: string) {
  const body = encodeURIComponent(`${text}\n${url}`);
  window.location.href = `sms:?body=${body}`;
}

export function shareViaEmail(url: string, text: string, subject = "Share") {
  const encodedSubject = encodeURIComponent(subject);
  const body = encodeURIComponent(`${text}\n\n${url}`);
  window.location.href = `mailto:?subject=${encodedSubject}&body=${body}`;
}

export function shareToLinkedIn(url: string) {
  const encodedUrl = encodeURIComponent(url);
  openUrl(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`);
}

export function shareToReddit(url: string, text: string) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  openUrl(`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`);
}

