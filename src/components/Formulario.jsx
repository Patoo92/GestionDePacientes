import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

const Formulario = ({ db }) => {
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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
    let newErrors = {};

    const currentDate = new Date();
    const selectedDate = new Date(fields.date);
    if (!fields.date || isNaN(selectedDate) || selectedDate > currentDate) {
      valid = false;
      newErrors.date = 'Fecha inválida o en el futuro';
    }

    ['presion', 'pulso'].forEach((field) => {
      if (isNaN(fields[field])) {
        valid = false;
        newErrors[field] = 'Debe ser un número válido';
      }
    });

    ['sueno', 'tos', 'deposicion', 'orina'].forEach((field) => {
      if (!fields[field]) {
        valid = false;
        newErrors[field] = 'Este campo es requerido';
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Por favor, inicie sesión para enviar el formulario.');
      return;
    }

    const storage = getStorage();
    const imageUrls = {};

    try {
      for (const [key, file] of Object.entries(imageFiles)) {
        if (file) {
          const storageRef = ref(storage, `images/${key}-${Date.now()}-${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          imageUrls[key] = url;
        }
      }

      const formData = {
        ...fields,
        imageUrls,
        userId: user.uid // Añadimos el ID del usuario
      };

      console.log('Datos del formulario a enviar:', formData);

      await addDoc(collection(db, 'formularios'), formData);
      setSuccessMessage('Formulario enviado. Volviendo al menú principal...');
      setTimeout(() => {
        navigate('/menu'); // Redirige al menú principal después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      alert('Error al guardar el formulario: ' + error.message);
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
      {successMessage ? (
        <div className="success-message">
          {successMessage}
        </div>
      ) : (
        <form className="formulario" id="imageForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Fecha:</label>
              <input type="date" id="date" name="date" value={fields.date} onChange={handleChange} required />
              {errors.date && <p className="error">{errors.date}</p>}
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
          </div> <br />

          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Formulario;
