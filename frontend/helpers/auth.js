const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        // Si la respuesta no es exitosa, manejar el error
        if (response.status === 401) {
          throw new Error('Contraseña incorrecta');
        } else {
          throw new Error('Error de inicio de sesión');
        }
      }
  
      const data = await response.json();
      const token = data.token; // Obtener el token de la respuesta
  
      // Hacer algo con el token, como almacenarlo en el localStorage o utilizarlo para realizar otras solicitudes
  
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  };
  
  // Ejemplo de uso
  login('user1', 'incorrectpassword');
  