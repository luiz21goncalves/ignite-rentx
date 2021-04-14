import fs from "fs";
import { resolve } from "path";

import uploadConfig from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.tmpFolder, folder, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filePath = resolve(uploadConfig.tmpFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      console.error(err);
    }

    await fs.promises.unlink(filePath);
  }
}

export { LocalStorageProvider };
