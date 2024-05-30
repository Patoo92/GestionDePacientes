import React, { useState } from 'react';
import './Formulario.css';

const Formulario = () => {
  const [fields, setFields] = useState({
    date: '',
    peso: '',
    presion: '',
    pulso: '',
    sueno: '',
    tos: '',
    deposicion: '',
    orina: ''
  });
  const [imageFiles, setImageFiles] = useState({
    peso: null,
    presion: null,
    pulso: null
  });

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setImageFiles({
      ...imageFiles,
      [name]: file
    });
  };

  const validateFields = () => {
    let valid = true;
    let errors = {};

    // Validación de fecha
    const currentDate = new Date();
    const selectedDate = new Date(fields.date);
    if (!fields.date || isNaN(selectedDate) || selectedDate > currentDate) {
      valid = false;
      errors.date = 'Fecha inválida o en el futuro';
    }

    // Validación de campos numéricos
    ['presion', 'pulso'].forEach((field) => {
      if (isNaN(fields[field])) {
        valid = false;
        errors[field] = 'Debe ser un número válido';
      }
    });

    // Validación de selects
    ['sueno', 'tos', 'deposicion', 'orina'].forEach((field) => {
      if (!fields[field]) {
        valid = false;
        errors[field] = 'Este campo es requerido';
      }
    });

    return { valid, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = validateFields();

    if (valid) {
      // Procesar el envío del formulario
      alert('Formulario enviado');
    } else {
      // Mostrar errores
      console.log('Errores:', errors);
    }
  };

  const renderFileName = (file) => {
    if (!file) return null;
    return (
      <div className="file-name">
        {file.name}
      </div>
    );
  };

  return (
    <div className="form-container">
      <form className="formulario" id="imageForm" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Fecha:</label>
            <input type="date" id="date" name="date" value={fields.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="peso">Peso:</label>
            <input type="file" id="peso" name="peso" accept="image/*" capture="environment" onChange={handleImageChange} required />
            {renderFileName(imageFiles.peso)}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="presion">Presión:</label>
            <input type="file" id="presion" name="presion" accept="image/*" capture="environment" onChange={handleImageChange} required />
            {renderFileName(imageFiles.presion)}
          </div>
          <div className="form-group">
            <label htmlFor="pulso">Pulso:</label>
            <input type="file" id="pulso" name="pulso" accept="image/*" capture="environment" onChange={handleImageChange} required />
            {renderFileName(imageFiles.pulso)}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sueno">Sueño - Hs:</label>
            <select id="sueno" name="sueno" value={fields.sueno} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tos">Tos:</label>
            <select id="tos" name="tos" value={fields.tos} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="deposicion">Deposición:</label>
            <select id="deposicion" name="deposicion" value={fields.deposicion} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="orina">Orina Normal:</label>
            <select id="orina" name="orina" value={fields.orina} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
