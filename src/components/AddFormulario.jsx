import React, { useState } from 'react';
import PropTypes from 'prop-types'
import useWords from '../hooks/useWords';

const AddFormulario = ({ open, handleClose, refresh }) => {
    const { words, setWords } = useWords();
    const [formData, setFormData] = useState({
        palabra: '',
        traduccion: '',
        info: '',
        categoria: 'sustantivos'
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "radio") {
            // Solo actualizar el estado si es un campo de radio
            setFormData({ ...formData, [name]: value });
        } else {
            // Para otros campos del formulario, actualizar el estado como lo estás haciendo actualmente
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://raspberry.freedynamicdns.net:4443/palabras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Palabra agregada exitosamente');
                refresh();
                setFormData(
                    {
                        palabra: '',
                        traduccion: '',
                        info: '',
                        categoria: 'sustantivos'
                    })
                handleClose();
            } else {
                console.error('Error al agregar la palabra');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    if (open) {
        return (
            <div className="modal">
                <form className="formulario-add" onSubmit={handleSubmit}>
                    <div className="inputFields">
                        <div>
                            <label htmlFor="palabra">Palabra</label>
                        </div>
                        <div>
                            <input required type="text" id='palabra' name='palabra' value={formData.palabra} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="traduccion">Traducción</label>
                        </div>
                        <div>
                            <input required type="text" id='traduccion' name='traduccion' placeholder="Traducción" value={formData.traduccion} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="info">+Info</label>
                        </div>
                        <div>
                            <textarea id='info' name='info' rows={4} value={formData.info} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="checkFields">
                        <fieldset><legend>Categoria</legend>
                            <label><input required type="radio" name='categoria' value="verbos" onChange={handleChange} />Verbo</label>
                            <label><input required type="radio" name='categoria' value="sustantivos" onChange={handleChange} />Sustantivo</label>
                            <label><input required type="radio" name='categoria' value="conectores" onChange={handleChange} />Conector</label>
                            <label><input required type="radio" name='categoria' value="expresiones" onChange={handleChange} />Expresión</label>
                            <label><input required type="radio" name='categoria' value="palabras" onChange={handleChange} />Palabra</label>
                        </fieldset>
                    </div>
                    <div className="save">
                        <button type='submit' className="saveBtn" >Guardar</button><button type='button' className="cancelBtn" onClick={handleClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        );
    } else {
        return null;
    }
};

AddFormulario.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired
}

export default AddFormulario;
