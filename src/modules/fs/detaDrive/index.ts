import { IFs, TFsBookWithoutContentWithTags } from '../Fs';
import { Deta } from 'deta';

const detaDrive: IFs = {
  async addBook(book, sourceInfo) {
    const deta = Deta('<YOUR_PROJECT_KEY>');
    const drive = deta.Drive('<YOUR_DRIVE_NAME>');
    const { target, cover } = book;
    const targetBuffer = await target.arrayBuffer();
    const coverBuffer = cover ? await cover.arrayBuffer() : undefined;
    const targetFile = new File([targetBuffer], target.name, { type: target.type });
    const coverFile = coverBuffer ? new File([coverBuffer], cover.type) : undefined;
    const response = await drive.put(targetFile, { cover: coverFile });
    const { key } = response;
    return { hash: key };
  },

  async getBooks() {
    const deta = Deta('<YOUR_PROJECT_KEY>');
    const drive = deta.Drive('<YOUR_DRIVE_NAME>');
    const response = await drive.list();
    const books = response.items.map((item) => {
      const { name, type } = item;
      return { target: { name, type } };
    });
    return books as TFsBookWithoutContentWithTags[];
  },

  // Implement other methods for Deta Drive

};

export default detaDrive;
