var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

var uploadParams = { Bucket: 'demo-bucket-for-fse', Key: '', Body: '' };
var file = 'demo.txt';

var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
    console.log('File Error', err);
});

uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

s3.upload(uploadParams, function(err, data) {
    if (err) {
        console.log('Error', err);
    }
    if (data) {
        console.log('Upload Success', data.location);
    }
});