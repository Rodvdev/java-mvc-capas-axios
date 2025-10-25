package com.example.app.usuario;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Endpoint para iniciar sesión
     * POST /api/auth/login
     * 
     * @param loginDTO - Datos de login (usuario y clave)
     * @return AuthResponseDTO con el resultado de la autenticación
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        AuthResponseDTO response = authService.autenticar(loginDTO);
        
        if (response.isExito()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    /**
     * Endpoint para verificar si un token es válido
     * POST /api/auth/verify
     * 
     * @param token - Token a verificar
     * @return true si el token es válido
     */
    @PostMapping("/verify")
    public ResponseEntity<AuthResponseDTO> verifyToken(@RequestBody String token) {
        boolean isValid = authService.validarToken(token);
        
        AuthResponseDTO response = new AuthResponseDTO(
            isValid,
            isValid ? "Token válido" : "Token inválido"
        );
        
        return ResponseEntity.ok(response);
    }
}
