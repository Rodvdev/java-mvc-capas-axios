package com.example.app.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioDTO {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @NotBlank(message = "El login es obligatorio")
    @Size(min = 3, max = 20, message = "El login debe tener entre 3 y 20 caracteres")
    private String login;

    @NotBlank(message = "La clave es obligatoria")
    @Size(min = 4, max = 20, message = "La clave debe tener entre 4 y 20 caracteres")
    private String clave;

    // Constructors
    public UsuarioDTO() {}

    public UsuarioDTO(Long id, String nombre, String login, String clave) {
        this.id = id;
        this.nombre = nombre;
        this.login = login;
        this.clave = clave;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
