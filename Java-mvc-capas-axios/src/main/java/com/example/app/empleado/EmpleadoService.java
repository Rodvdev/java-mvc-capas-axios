package com.example.app.empleado;

import com.example.app.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // Obtener todos los empleados
    public List<EmpleadoDTO> obtenerTodos() {
        return empleadoRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Obtener empleado por ID
    public EmpleadoDTO obtenerPorId(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
        return convertirADTO(empleado);
    }

    // Crear empleado
    public EmpleadoDTO crear(EmpleadoDTO empleadoDTO) {
        Empleado empleado = convertirAEntidad(empleadoDTO);
        Empleado empleadoGuardado = empleadoRepository.save(empleado);
        return convertirADTO(empleadoGuardado);
    }

    // Actualizar empleado
    public EmpleadoDTO actualizar(Long id, EmpleadoDTO empleadoDTO) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));

        empleado.setNombre(empleadoDTO.getNombre());
        empleado.setApellido(empleadoDTO.getApellido());
        empleado.setEmail(empleadoDTO.getEmail());
        empleado.setTelefono(empleadoDTO.getTelefono());
        empleado.setFechaContratacion(empleadoDTO.getFechaContratacion());
        empleado.setSalario(empleadoDTO.getSalario());
        empleado.setCargo(empleadoDTO.getCargo());
        empleado.setDepartamentoId(empleadoDTO.getDepartamentoId());

        Empleado empleadoActualizado = empleadoRepository.save(empleado);
        return convertirADTO(empleadoActualizado);
    }

    // Eliminar empleado
    public void eliminar(Long id) {
        if (!empleadoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empleado no encontrado con id: " + id);
        }
        empleadoRepository.deleteById(id);
    }

    // Buscar por nombre
    public List<EmpleadoDTO> buscarPorNombre(String nombre) {
        return empleadoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Buscar por cargo
    public List<EmpleadoDTO> buscarPorCargo(String cargo) {
        return empleadoRepository.findByCargoContainingIgnoreCase(cargo)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Métodos auxiliares de conversión
    private EmpleadoDTO convertirADTO(Empleado empleado) {
        return new EmpleadoDTO(
                empleado.getId(),
                empleado.getNombre(),
                empleado.getApellido(),
                empleado.getEmail(),
                empleado.getTelefono(),
                empleado.getFechaContratacion(),
                empleado.getSalario(),
                empleado.getCargo(),
                empleado.getDepartamentoId()
        );
    }

    private Empleado convertirAEntidad(EmpleadoDTO dto) {
        return new Empleado(
                dto.getId(),
                dto.getNombre(),
                dto.getApellido(),
                dto.getEmail(),
                dto.getTelefono(),
                dto.getFechaContratacion(),
                dto.getSalario(),
                dto.getCargo(),
                dto.getDepartamentoId()
        );
    }
}
