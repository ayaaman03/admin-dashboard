import { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { fileToDataUrl } from '../../utils/helpers';

/**
 * ImageUpload — bonus feature: drag & drop image upload with preview.
 * Converts the chosen file to a base64 data URL so it can be stored
 * directly in JSON Server (which has no real file storage).
 */
function ImageUpload({ value, onChange, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    handleFile(file);
  }

  function handleRemove(e) {
    e.stopPropagation();
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  }

  if (value) {
    return (
      <div className="form-group">
        <label className="form-label">Product Image</label>
        <div className="image-preview">
          <img src={value} alt="Product preview" />
          <button type="button" className="remove-image" onClick={handleRemove} aria-label="Remove image">
            <FaTimes />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label className="form-label">Product Image</label>
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt />
        <p>
          <span className="highlight">Click to upload</span> or drag and drop
        </p>
        <p style={{ marginTop: 4 }}>PNG, JPG up to 5MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          aria-label="Upload product image"
        />
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default ImageUpload;
