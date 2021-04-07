var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

var bucketParams = {
    Bucket: 'demo-bucket-for-fse'
}

s3.listObjects(bucketParams, function(err, data) {
    if (err) {
        console.log('Error', err);
    }
    if (data) {
        console.log('Success', data);
    }
});