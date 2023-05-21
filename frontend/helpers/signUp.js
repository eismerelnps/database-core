const createUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
  
      const data = await response.json();
  
      console.log('Usuario creado exitosamente');
      console.log(data); // Aquí puedes hacer algo con la respuesta del servidor, como mostrar información sobre el usuario creado
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
    }
  };
  
  // Ejemplo de uso
  createUser('user1', 'password123');
  