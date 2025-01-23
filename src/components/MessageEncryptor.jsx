import { useState } from 'react';
import PropTypes from 'prop-types';
import ElGamalCrypto from './ElGamalCrypto';

function MessageEncryptor({ publicKey, onEncrypt }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEncrypt = () => {
    try {
      if (!message) throw new Error('Please enter a message to encrypt.');
      if (!publicKey || !publicKey.alpha || !publicKey.p || !publicKey.beta) {
        throw new Error('Invalid public key structure.');
      }

      const encrypted = ElGamalCrypto.encrypt(message, publicKey);
      onEncrypt(encrypted);
      setError('');
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="message-encryptor">
      <h2>Encryption</h2>
      {error && <div className="error">{error}</div>}
      <textarea
        placeholder="Enter message to encrypt"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleEncrypt}>Encrypt</button>
    </div>
  );
}

MessageEncryptor.propTypes = {
  publicKey: PropTypes.shape({
    alpha: PropTypes.any.isRequired,
    beta: PropTypes.any.isRequired,
    p: PropTypes.any.isRequired,
  }).isRequired,
  onEncrypt: PropTypes.func.isRequired,
};

export default MessageEncryptor;
