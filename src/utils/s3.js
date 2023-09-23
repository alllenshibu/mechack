const { S3Client } = require('@aws-sdk/client-s3');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    endpoint: process.env.S3_BUCKET_ENDPOINT,
    forcePathStyle: false,
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_BUCKET_ACCESS_KEY_SECRET
    }
});

// const file = fs.readFileSync("./file.pdf");

// const exampleParams = {
//     Bucket: "bucket-name", // The path to the directory to upload the object to, starting with the Space name.
//     Key: "key", // Object key, referenced whenever accessing this file later.
//     Body: file, // The object's contents.
//     ACL: "public-read", // Defines ACL permissions, such as private or public.
//     Metadata: { // Defines metadata tags.
//         "x-amz-meta-my-key": "your-value"
//     }
// };

const uploadObject = async (params) => {
    // console.log("Starting object upload to S3 bucket: " + params.Bucket + "/" + params.Key);
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        // console.log("Successfully uploaded object: " + params.Bucket + "/" + params.Key);
        // console.log("Response data:", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};

module.exports = {
    uploadObject
};
