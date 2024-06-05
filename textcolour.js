function getMostFrequentColor(image) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorCount = {};
    let maxCount = 0;
    let mostFrequentColor = [0, 0, 0];

    for (let i = 0; i < data.length; i += 4) {
        const rgb = [data[i], data[i + 1], data[i + 2]];
        const key = rgb.join(',');

        colorCount[key] = (colorCount[key] || 0) + 1;

        if (colorCount[key] > maxCount) {
            maxCount = colorCount[key];
            mostFrequentColor = rgb;
        }
    }

    return mostFrequentColor;
}

function getComplementaryColor(rgb) {
    return rgb.map(channel => 255 - channel);
}

function rgbToHex(rgb) {
    return `#${rgb.map(channel => channel.toString(16).padStart(2, '0')).join('')}`;
}

window.onload = function() {
    const image = new Image();
    image.src = 'background.jpg';
    image.onload = function() {
        const mostFrequentColor = getMostFrequentColor(image);
        const complementaryColor = getComplementaryColor(mostFrequentColor);
        const complementaryColorHex = rgbToHex(complementaryColor);

        document.body.style.color = complementaryColorHex;
    }
}
