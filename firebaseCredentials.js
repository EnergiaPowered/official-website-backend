require("dotenv").config();
const private_key = process.env.GOOGLE_CREDS_private_key.replace(/\\n/g, "\n");

serviceAccountObject = {
  type: "service_account",
  project_id: process.env.GOOGLE_CREDS_project_id,
  private_key_id: process.env.GOOGLE_CREDS_private_key_id,
  private_key: private_key,
  client_email: process.env.GOOGLE_CREDS_client_email,
  client_id: process.env.GOOGLE_CREDS_client_id,
  auth_uri: process.env.GOOGLE_CREDS_auth_uri,
  token_uri: process.env.GOOGLE_CREDS_token_uri,
  auth_provider_x509_cert_url:
    process.env.GOOGLE_CREDS_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.GOOGLE_CREDS_client_x509_cert_url,
};

let serviceAccount = JSON.stringify(serviceAccountObject);
serviceAccount = JSON.parse(serviceAccount);
module.exports = serviceAccount;
