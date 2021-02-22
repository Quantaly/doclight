import { PdfJob } from 'doclight-wasm';
import sanitizeFilename from './filename-sanitization';

async function createPdf(images: string[]): Promise<Blob | null> {
    const job = PdfJob.new();
    for (const src of images) {
        job.add_image(new Uint8Array(await (await fetch(src)).arrayBuffer()));
    }
    try {
        const result = job.create_pdf();
        return new Blob([result], { type: 'application/pdf' });
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function downloadPdf(images: string[], documentName: string): Promise<boolean> {
    const blob = await createPdf(images);
    if (blob) {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `${sanitizeFilename(documentName)}.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
    return !!blob;
}