package com.example.app.empleado;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.math.BigDecimal;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    // Métodos de búsqueda personalizados
    List<Empleado> findByNombreContainingIgnoreCase(String nombre);
    
    List<Empleado> findByCargoContainingIgnoreCase(String cargo);
    
    List<Empleado> findBySalarioGreaterThan(BigDecimal salario);
    
    List<Empleado> findByDepartamentoId(Long departamentoId);
}
