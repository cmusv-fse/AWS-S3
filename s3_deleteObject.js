const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const deleteParams = {
  Bucket: 'demo-bucket-for-fse',
  Key: 'demo.txt',
};

s3.deleteObject(deleteParams, function (err, data) {
  if (err) {
    console.log('Error', err);
  }
  if (data) {
    console.log('Delete Success');
  }
});
