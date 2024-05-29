import React, { useState } from 'react';
import './Formulario.css';

const Formulario = () => {
  const [fields, setFields] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: ''
  });
  const [imageCount, setImageCount] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const maxImages = 5;

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > maxImages) {
      alert(`Solo puedes subir hasta ${maxImages} imágenes`);
      return;
    }
    setImageFiles(files);
    setImageCount(files.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    Object.values(fields).forEach((value) => {
      if (!value.trim()) {
        valid = false;
      } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        valid = false;
      }
    });

    if (imageCount === 0) {
      alert("Debe subir al menos una imagen");
      valid = false;
    }

    if (valid) {
      // Procesar el envío del formulario
      alert('Formulario enviado');
    }
  };

  const renderPreview = () => {
    return imageFiles.map((file, index) => (
      <div key={index} style={{ display: 'inline-block', position: 'relative', margin: '5px' }}>
        <img src={URL.createObjectURL(file)} alt={`preview-${index}`} style={{ width: '100px', height: '100px' }} />
      </div>
    ));
  };

  return (
    <div className="form-container">
      <form className="formulario" id="imageForm" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="field1">Campo 1:</label>
        <input type="text" id="field1" name="field1" value={fields.field1} onChange={handleChange} required /><br /><br />

        <label htmlFor="field2">Campo 2:</label>
        <input type="text" id="field2" name="field2" value={fields.field2} onChange={handleChange} required /><br /><br />

        <label htmlFor="field3">Campo 3:</label>
        <input type="text" id="field3" name="field3" value={fields.field3} onChange={handleChange} required /><br /><br />

        <label htmlFor="field4">Campo 4:</label>
        <input type="text" id="field4" name="field4" value={fields.field4} onChange={handleChange} required /><br /><br />

        <input type="file" name="photos" id="photos" onChange={handleImageChange} multiple />
        <div id="previewContainer">{renderPreview()}</div> 

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
