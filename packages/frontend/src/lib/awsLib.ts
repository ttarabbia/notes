import { Storage } from "aws-amplify";

export async function s3Upload(file: File) {
  const filename = `${Date.now()} - ${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
    level: "private",
  });

  return stored.key;
}
export async function s3Delete(key: string) {
  // const filename = `${Date.now()} - ${file.name}`;

  const deleted = await Storage.vault.remove(key);

  return key;
}
