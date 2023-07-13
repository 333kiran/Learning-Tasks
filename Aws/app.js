const AWS = require('aws-sdk');

// AWS_SDK_LOAD_CONFIG='1';
async function retrieveSecretValue() {
  try {
    const secretName = 'myData';
    const region = 'eu-north-1';

    // Set the AWS region
    AWS.config.update({ region });

    // Create a Secrets Manager client
    const client = new AWS.SecretsManager();

    // Retrieve the secret value
    const data = await client.getSecretValue({ SecretId: secretName });
    console.log(data);

    if ('SecretString' in data) { 
      const secretValue = data.SecretString;
      console.log('Retrieved secret value:', secretValue);
    } else {
      const binarySecretData = data.SecretBinary;
      console.log('Binary secret value cannot be displayed.',binarySecretData);
    }
 } catch (error) {
    console.error('Error retrieving secret value:', error);
  }
}

retrieveSecretValue();
