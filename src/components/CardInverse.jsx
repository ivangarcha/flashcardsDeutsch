import { useState } from "react";
import PropTypes from 'prop-types';

const CardInverse = ({ word}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card" key={word.palabra}>
            <h2>{word.traduccion}</h2>
            <button className="showBtn" onClick={() => {
                setVisible(!visible)
            }}>Descubrir</button>
            <div className={visible ? "visible" : "invisible"}>
                <label>Traducción</label>
                <h2>{word.palabra}</h2>
                <label>Categoría</label>
                <h2>{word.categoria}</h2>
                <label>+Info</label>
                <h2>{word.info}</h2>
            </div>
        </div >
    )
}

CardInverse.propTypes = {
    word: PropTypes.shape({
        palabra: PropTypes.string.isRequired,
        traduccion: PropTypes.string.isRequired,
        categoria: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired
    }).isRequired
};

export default CardInverse