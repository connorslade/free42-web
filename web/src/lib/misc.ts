export async function loadImage(path: string): Promise<HTMLImageElement> {
  let skin = new Image();
  skin.src = path;
  return new Promise((resolve) => {
    skin.onload = () => resolve(skin);
  });
}

// From https://stackoverflow.com/a/70226943
export function kebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
