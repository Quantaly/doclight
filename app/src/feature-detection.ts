export function detectImageCapture(): boolean {
    const dummy = document.createElement('input');
    dummy.type = 'file';
    dummy.accept = 'image/jpeg';
    return 'capture' in dummy;
}
