
export interface ParsedReceipt {
    store?: string;
    date?: string;
    total?: number;
    items: Array<{
        name: string;
        price: number;
        quantity?: number;
    }>;
}

export class ReceiptParser {
    static parse(text: string): ParsedReceipt {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // 1. Basic Store Extraction (Heuristic: First non-empty line usually store name)
        // Refinement: Look for known chains or keywords in first 5 lines
        let store = lines[0] || "Unknown Store";

        // 2. Date Extraction
        let date: string | undefined;
        const dateRegex = /(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})|(\d{4}[-/.]\d{2}[-/.]\d{2})/;
        for (const line of lines) {
            const match = line.match(dateRegex);
            if (match) {
                date = match[0];
                break;
            }
        }

        // 3. Total Extraction
        // Look for lines starting with "Total", "Balance", "Amount"
        // Then find the last dollar amount in that line or subsequent lines
        let total: number | undefined;
        const totalRegex = /(?:Total|Balance|Amount|Due)\s*[:.$]?\s*(\$?\d+\.\d{2})/i;
        // Also simple currency search at end of receipt
        const currencyRegex = /(\d+\.\d{2})/;

        // Scan from bottom up for total
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            if (line.match(/total|balance|due/i)) {
                const match = line.match(currencyRegex);
                if (match) {
                    total = parseFloat(match[1]);
                    break;
                }
            }
        }

        // 4. Line Item Extraction (Very Naive)
        // Look for lines that end in a price like "12.99"
        const items: ParsedReceipt['items'] = [];
        const itemPriceRegex = /^(.+?)\s+(\$?[\d,]+\.\d{2})$/;

        for (const line of lines) {
            // Skip lines that look like totals/subtotals/tax
            if (line.match(/total|subtotal|tax|change|cash|visa|mastercard|due/i)) continue;

            const match = line.match(itemPriceRegex);
            if (match) {
                const name = match[1].trim();
                const priceStr = match[2].replace('$', '').replace(',', '');
                const price = parseFloat(priceStr);

                // Heuristic: Name shouldn't be too short or numeric
                if (name.length > 3 && isNaN(parseFloat(name))) {
                    items.push({ name, price, quantity: 1 });
                }
            }
        }

        return {
            store,
            date,
            total,
            items
        };
    }
}
