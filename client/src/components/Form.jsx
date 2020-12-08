import React, { memo, useCallback, useState } from 'react';

const DefaultForm = ({ colors, handleLogin}) => {
  const [color, setColor] = useState('');
  const [nombre, setNombre] = useState('');

  const handleColor = useCallback((e) => {
    e.preventDefault();
    setColor(e.target.value);
  }, [setColor]);

  const handleName = useCallback((e) => {
    e.preventDefault();
    setNombre(e.target.value);
  }, [setNombre]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleLogin(nombre, color);
  }, [handleLogin, nombre, color]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Escribe tu nombre: </label>
      <input type="text" value={nombre} name="nombre" onChange={handleName} />

      <label>Elije tu color: </label>
      <select onChange={handleColor} value={color} name="color" >
        <option>Default</option>
        {colors?.map((color) => (
          <option key={color}>{color}</option>
        ))}
      </select>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default memo(DefaultForm);
