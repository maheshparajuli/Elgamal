import  { useState } from 'react';
import KeyGenerator from './components/KeyGenerator';
import MessageEncryptor from './components/MessageEncryptor';
import MessageDecryptor from './components/MessageDecryptor';
import './styles/App.css';

function App() {
  const [keys, setKeys] = useState(null); // Stores public and private keys
  const [encryptedMessage, setEncryptedMessage] = useState(null); // Stores encrypted message blocks

  const handleKeysGenerated = (generatedKeys) => {
    setKeys(generatedKeys);
    console.log('Generated Keys:', generatedKeys);
  };

  const handleEncryption = (ciphertext) => {
    setEncryptedMessage(ciphertext);
    console.log('Encrypted Message:', ciphertext);
  };

  return (
    <div className="app-container">
      <h1>ElGamal Encryption</h1>

      {/* Step 1: Generate Keys */}
      <KeyGenerator onKeysGenerated={handleKeysGenerated} />

      {/* Display Generated Keys */}
      {keys && (
        <div className="keys-display">
          <h3>Generated Keys:</h3>
          <p><strong>Public Key:</strong> {JSON.stringify(keys.publicKey)}</p>
          <p><strong>Private Key:</strong> {keys.privateKey}</p>
        </div>
      )}

      {/* Step 2: Encrypt Message (Shown only if keys are generated) */}
      {keys && (
        <MessageEncryptor 
          publicKey={keys.publicKey} 
          onEncrypt={handleEncryption} 
        />
      )}

      {/* Step 3: Decrypt Message (Shown only if a message is encrypted) */}
      {encryptedMessage && (
        <MessageDecryptor 
          privateKey={keys.privateKey}
          publicKey={keys.publicKey}
          encryptedMessage={encryptedMessage}
        />
      )}
    </div>
  );
}

export default App;
