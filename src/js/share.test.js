import { buildShareText } from './share';
import RAINBOW_COLORS from './colors';

describe('buildShareText', () => {
    it('encodes the colors in find-order as an emoji grid alongside the win number', () => {
        const text = buildShareText(3, RAINBOW_COLORS, [2, 0, 4]);

        expect(text).toBe('Car Rainbow — Win #3: 🟨🟥🟦');
    });

    it('produces an empty grid when nothing has been found yet', () => {
        const text = buildShareText(1, RAINBOW_COLORS, []);

        expect(text).toBe('Car Rainbow — Win #1: ');
    });
});
