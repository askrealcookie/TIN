import { nanoid } from 'nanoid';

const palettes = [
  {
    id: '1',
    name: 'Podstawowa',
    colors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff']
  },
  {
    id: '2',
    name: 'Pastelowa',
    colors: ['#ffd6e8', '#d7f9f1', '#fbe7c6', '#cdb4db', '#bde0fe']
  },
  {
    id: '3',
    name: 'Neonowa',
    colors: ['#ff00ff', '#00ffff', '#ffff00', '#39ff14', '#ff3131']
  }
];

const images = [];

export function getPalettes() {
  return palettes;
}

export function getPaletteById(id) {
  return palettes.find(palette => palette.id === id);
}

export function getImages() {
  return images;
}

export function getImageById(id) {
  return images.find(image => image.id === id);
}

export function addImage(data) {
  const image = {
    id: nanoid(8),
    gridSize: data.gridSize,
    cells: data.cells,
    createdAt: new Date().toISOString()
  };

  images.push(image);
  return image;
}

export function deleteImage(id) {
  const imageIndex = images.findIndex(image => image.id === id);

  if (imageIndex === -1) {
    return false;
  }

  images.splice(imageIndex, 1);
  return true;
}
