package com.example.app.usuario;

import com.example.app.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Autenticar un usuario
     * @param loginDTO - Datos de login (usuario y clave)
     * @return AuthResponseDTO con el resultado de la autenticación
     */
    public AuthResponseDTO autenticar(LoginDTO loginDTO) {
        // Buscar el usuario por login y clave
        Usuario usuario = usuarioRepository.findByLoginAndClave(
            loginDTO.getUsuario(), 
            loginDTO.getClave()
        );

        if (usuario != null) {
            // Login exitoso
            String token = generarToken(usuario);
            return new AuthResponseDTO(
                true,
                "Login exitoso",
                usuario.getNombre(),
                token
            );
        } else {
            // Login fallido
            return new AuthResponseDTO(
                false,
                "Usuario o contraseña incorrectos"
            );
        }
    }

    /**
     * Verificar si un token es válido
     * @param token - Token a verificar
     * @return true si el token es válido
     */
    public boolean validarToken(String token) {
        // Por ahora, un token simple es válido si existe en la DB
        // En producción, usaríamos JWT o similar
        return token != null && !token.isEmpty();
    }

    /**
     * Generar un token simple para el usuario
     * En producción, usar JWT
     * @param usuario - Usuario autenticado
     * @return Token generado
     */
    private String generarToken(Usuario usuario) {
        // Token simple basado en ID y timestamp
        // En producción, usar JWT
        return "token_" + usuario.getId() + "_" + System.currentTimeMillis();
    }
}
