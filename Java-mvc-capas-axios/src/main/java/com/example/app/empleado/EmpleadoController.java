package com.example.app.empleado;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    // GET - Obtener todos los empleados
    @GetMapping
    public ResponseEntity<List<EmpleadoDTO>> obtenerTodos() {
        List<EmpleadoDTO> empleados = empleadoService.obtenerTodos();
        return ResponseEntity.ok(empleados);
    }

    // GET - Obtener empleado por ID
    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoDTO> obtenerPorId(@PathVariable Long id) {
        EmpleadoDTO empleado = empleadoService.obtenerPorId(id);
        return ResponseEntity.ok(empleado);
    }

    // POST - Crear nuevo empleado
    @PostMapping
    public ResponseEntity<EmpleadoDTO> crear(@Valid @RequestBody EmpleadoDTO empleadoDTO) {
        EmpleadoDTO nuevoEmpleado = empleadoService.crear(empleadoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEmpleado);
    }

    // PUT - Actualizar empleado
    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody EmpleadoDTO empleadoDTO) {
        EmpleadoDTO empleadoActualizado = empleadoService.actualizar(id, empleadoDTO);
        return ResponseEntity.ok(empleadoActualizado);
    }

    // DELETE - Eliminar empleado
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        empleadoService.eliminar(id);
        return ResponseEntity.ok("Empleado con id: " + id + " eliminado exitosamente");
    }

    // GET - Buscar por nombre
    @GetMapping("/buscar/nombre")
    public ResponseEntity<List<EmpleadoDTO>> buscarPorNombre(@RequestParam String nombre) {
        List<EmpleadoDTO> empleados = empleadoService.buscarPorNombre(nombre);
        return ResponseEntity.ok(empleados);
    }

    // GET - Buscar por cargo
    @GetMapping("/buscar/cargo")
    public ResponseEntity<List<EmpleadoDTO>> buscarPorCargo(@RequestParam String cargo) {
        List<EmpleadoDTO> empleados = empleadoService.buscarPorCargo(cargo);
        return ResponseEntity.ok(empleados);
    }
}
