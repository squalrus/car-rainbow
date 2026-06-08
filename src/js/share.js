export function buildShareText(winNumber, colors, foundOrder) {
    const grid = foundOrder.map((index) => colors[index].emoji).join('');
    return `Car Rainbow — Win #${winNumber}: ${grid}\nPlay at https://carrainbow.quest/`;
}
