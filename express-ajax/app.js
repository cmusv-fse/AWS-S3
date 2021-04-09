const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');


/**
 * Configure multer with inmemory storage
 *
 * Optionally you could use disk storage as well.
 * Checkout the docs
 * https://www.npmjs.com/package/multer
 */
const storage = multer.memoryStorage()
const upload = multer({ storage });

/**
 * Note that if you have those env vars configured, you don't need to pass in any params to aws-sdk
 * AWS_DEFAULT_REGION
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY
 * alternatively, if you are developing at local enviornment, you could edit your
 * `~/.aws/credentials` file to include your credentials
 * sample file content for `~/.aws/credentials`:
 * [default]
 * aws_access_key_id=<YOUR_AWS_ACCESS_KEY_ID>
 * aws_secret_access_key=<YOUR_AWS_SECRET_ACCESS_KEY>
 */
const s3 = new AWS.S3();

const app = express();

app
  .get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
  .post('/images', upload.single('image'), (req, res, next) => {
    s3
      .putObject({
        Bucket: 'demo-bucket-for-fse',
        Key: req.file.originalname,
        Body: req.file.buffer,
      })
      .promise()
      .then(() => {
        res.json({
          ok: true,
        })
      })
      .catch(next)
  });

app.listen(3000, () => console.log('server started at port 3000'))

