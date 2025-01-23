import { useState } from 'react';
import ElGamalCrypto from './ElGamalCrypto';

function MessageDecryptor({ privateKey, publicKey, encryptedMessage }) {
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState('');
  const [rawCharCodes, setRawCharCodes] = useState([]);

  const handleDecrypt = () => {
    try {
      if (!privateKey || !publicKey || !publicKey.p || !Array.isArray(encryptedMessage) || encryptedMessage.length === 0) {
        throw new Error('Invalid input parameters');
      }

      console.log('Encrypted Message:', encryptedMessage);
      console.log('Private Key:', privateKey);
      console.log('Public Key:', publicKey);

      const decryptedCharCodes = ElGamalCrypto.decrypt(encryptedMessage, privateKey, publicKey.p);
      console.log('Decrypted Char Codes:', decryptedCharCodes);
      setRawCharCodes(decryptedCharCodes);

      const decrypted = ElGamalCrypto.charCodesToString(decryptedCharCodes);
      setDecryptedMessage(decrypted);
      setError('');
    } catch (err) {
      console.error('Decryption Error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="message-decryptor">
      {error && <div className="error">{error}</div>}
      <div className="encrypted-blocks">
        <h3>Encrypted Blocks:</h3>
        {encryptedMessage.map((block, index) => (
          <p key={index}>
            Block {index + 1}: γ = {block.gamma}, δ = {block.delta}
          </p>
        ))}
      </div>
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedMessage && (
        <div className="decrypted-message">
          <h3>Decrypted Message:</h3>
          <p>{decryptedMessage}</p>
        </div>
      )}
      {rawCharCodes.length > 0 && (
        <div className="raw-char-codes">
          <h3>Raw Character Codes:</h3>
          <p>{rawCharCodes.join(', ')}</p>
        </div>
      )}
    </div>
  );

  
}

export default MessageDecryptor;
import PropTypes from 'prop-types';

MessageDecryptor.propTypes = {
  privateKey: PropTypes.object.isRequired,
  publicKey: PropTypes.object.isRequired,
  encryptedMessage: PropTypes.array.isRequired,
};

