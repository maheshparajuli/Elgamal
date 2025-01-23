import { useState } from "react";
import PropTypes from "prop-types";
import ElGamalCrypto from "./ElGamalCrypto";

function KeyGenerator({ onKeysGenerated }) {
  const [p, setP] = useState();
  const [alpha, setAlpha] = useState();
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleGenerateKeys = () => {
    try {
      if (!isPrime(p)) throw new Error("p must be a prime number.");
      if (alpha <= 0 || alpha >= p)
        throw new Error("α must be a positive integer less than p.");

      const keys = ElGamalCrypto.generateKeys(
        p,
        alpha,
        privateKey ? parseInt(privateKey, 10) : undefined
      );

      onKeysGenerated(keys);
      setError("");
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="key-generator">
      <h2>Key Generation</h2>
      {error && <div className="error">{error}</div>}
      <div className="input-group">
        <label>
          Prime p:
          <input
            type="number"
            min="2"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            placeholder="Prime p"
          />
        </label>
        <label>
          Generator α:
          <input
            type="number"
            min="1"
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            placeholder="Generator α"
          />
        </label>
        <label>
          Private Key (optional):
          <input
            type="number"
            min="1"
            value={privateKey || ""}
            onChange={(e) => setPrivateKey(Number(e.target.value))}
            placeholder="Private Key (optional)"
          />
        </label>
        <button onClick={handleGenerateKeys}>Generate Keys</button>
      </div>
    </div>
  );
}

// Add PropTypes validation
KeyGenerator.propTypes = {
  onKeysGenerated: PropTypes.func.isRequired,
};

export default KeyGenerator;
