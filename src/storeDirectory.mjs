import 'dotenv/config'
import { NFTStorage, File } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'

async function main() {
	const path = process.argv[2];
	const test = process.argv[3];
	const files =
		await getFilesFromPath(path,
			{
				pathPrefix: path
				, hidden: false
			});
	const apiKey = process.env.NFT_STORAGE_KEY;
	const storage = new NFTStorage({ apiKey });

	console.log(`storing ${files.length} file(s) from ${path}`);

	if (test == 'true') {
		console.log(`api key ${apiKey}`);
		console.log(`first file name ${files[0].name}`);
		return;
	}

	const cid = await storage.storeDirectory(files);
	console.log({ cid });

	const status = await storage.status(cid);
	console.log(status);
}

// Run command example: node src/storeDirectory.mjs 'E:\Progetti\NFTStorageUpload\storage\images\' true/false
main()