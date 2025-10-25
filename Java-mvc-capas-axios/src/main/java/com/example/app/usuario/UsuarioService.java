package com.example.app.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todos los usuarios
    public List<UsuarioDTO> obtenerTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Obtener usuario por ID
    public UsuarioDTO obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        return convertirADTO(usuario);
    }

    // Crear usuario
    public UsuarioDTO crear(UsuarioDTO usuarioDTO) {
        // Verificar si el login ya existe
        if (usuarioRepository.findByLogin(usuarioDTO.getLogin()).isPresent()) {
            throw new RuntimeException("El login ya existe: " + usuarioDTO.getLogin());
        }

        Usuario usuario = convertirAEntidad(usuarioDTO);
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return convertirADTO(usuarioGuardado);
    }

    // Métodos auxiliares de conversión
    private UsuarioDTO convertirADTO(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getLogin(),
                null // No devolver la clave por seguridad
        );
    }

    private Usuario convertirAEntidad(UsuarioDTO dto) {
        return new Usuario(
                dto.getId(),
                dto.getNombre(),
                dto.getLogin(),
                dto.getClave()
        );
    }
}
