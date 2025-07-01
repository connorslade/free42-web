export async function loadImage(path: string): Promise<HTMLImageElement> {
  let skin = new Image();
  skin.src = path;
  return new Promise((resolve) => {
    skin.onload = () => resolve(skin);
  });
}
