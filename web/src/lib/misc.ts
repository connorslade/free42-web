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

export function downloadFile(bytes: Uint8Array, type: string, name: string) {
  let blob = new Blob([bytes], { type });
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  link.click();
}
