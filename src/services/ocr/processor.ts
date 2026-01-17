
import Tesseract from 'tesseract.js';

export interface OCRResult {
    text: string;
    confidence: number;
}

export class OCRProcessor {
    static async processImage(imageFile: File, progressCallback?: (progress: number) => void): Promise<OCRResult> {
        const worker = await Tesseract.createWorker("eng", 1, {
            logger: m => {
                if (m.status === 'recognizing text' && progressCallback) {
                    progressCallback(m.progress);
                }
            }
        });

        try {
            const { data: { text, confidence } } = await worker.recognize(imageFile);

            await worker.terminate();

            return {
                text,
                confidence
            };
        } catch (error) {
            console.error("OCR Processing failed:", error);
            throw new Error("Failed to process image");
        }
    }
}
