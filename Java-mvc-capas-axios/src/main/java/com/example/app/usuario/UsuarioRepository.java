package com.example.app.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar usuario por login
    Optional<Usuario> findByLogin(String login);
    
    // Verificar si existe un usuario con ese login y clave
    Usuario findByLoginAndClave(String login, String clave);
}
