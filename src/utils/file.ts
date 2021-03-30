import fs from "fs";

const deleteFile: (filePath: string) => Promise<void> = async (
  filePath: string
) => {
  try {
    await fs.promises.stat(filePath);
  } catch (err) {
    console.error(err);
  }

  await fs.promises.unlink(filePath);
};

export { deleteFile };
