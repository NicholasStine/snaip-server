// Package Imports
const router = require('express').Router();
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');

require('firebase/app')
require('firebase/storage');

// Local Imports
const pool = require('../psqlConnection.js');

// Initialize Firebase Cloud Storage Connection
const storage = new Storage({
	keyFilename: path.join(__dirname, process.env.GCLOUD_APPLICATION_CREDENTIALS),
	projectId: process.env.GCLOUD_PROJECT_ID
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

// Multer for file Uploading
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 8 * 1024 * 1024
	}
});

// Upload a new image and save it's url
router.post('/image', upload.single('image'), async (req, res, next) => {
	try {
		console.log(req.body);
		if (!req.file) {
			return res.status(401).json('No image uploaded');
		}

		const blob = bucket.file(req.file.originalname);
		const blobWriter = blob.createWriteStream({
			metadata: { contentType: req.file.mimetype },
			resumable: false
		});

		blobWriter.on('error', (err) => next(err));
		blobWriter.on('finish', async () => {
			const imageURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
			await pool.query("INSERT INTO images (user_id, img_name, img_url) VALUES ($1, $2, $3)",
				[req.body.user_id, req.file.originalname, imageURL]);
			res.status(200).json({
				fileName: req.file.originalname,
				downloadURL: imageURL
			});
		});
		blobWriter.end(req.file.buffer);

	} catch (err) {
		console.log(err.message);
		res.status(500).json(err.message);
	}
});

// router.get('/image/:account_id/:certification_id', async (req, res) => {
// 	try {
// 		var imageList = [];
// 		const checkID = await pool.query("SELECT * FROM certification_images WHERE account_id = $1 AND certification_id = $2",
// 			[req.params.account_id, req.params.certification_id]);
// 		if (checkID.rows.length == 0) {
// 			res.status(401).json("Invalid Account / Certification ID");
// 		}

// 		for (const image of checkID.rows) {
// 			imageList.push(image);
// 		}

// 		res.status(200).json(imageList);
// 	} catch (err) {
// 		console.log(err.message);
// 		res.status(500).json(err.message);
// 	}
// });

// router.delete('/image/:account_id/:certification_id/:image_name', async (req, res) => {
// 	try {
// 		const checkID = await pool.query("SELECT * FROM certification_images WHERE account_id = $1 AND certification_id = $2 AND img_name = $3",
// 			[req.params.account_id, req.params.certification_id, req.params.image_name]);
// 		if (checkID.rows.length == 0) {
// 			res.status(401).json("Invalid Account / Certification ID or Image Name");
// 		}

// 		file = bucket.file(req.params.image_name);

// 		file.delete()
// 			.then(async () => {
// 				await pool.query("DELETE FROM certification_images WHERE account_id = $1 AND certification_id = $2 AND img_name = $3",
// 					[req.params.account_id, req.params.certification_id, req.params.image_name]);
// 				return res.status(200).json("Image Deleted Successfully");
// 			})
// 			.catch((err) => {
// 				return res.status(401).json("Something went wront with Google Cloud Storage");
// 			});
// 	} catch (err) {
// 		console.log(err.message);
// 		res.status(500).json(err.message);
// 	}
// });

module.exports = router;