package com.example.app.usuario;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {

    @NotBlank(message = "El usuario es obligatorio")
    private String usuario;

    @NotBlank(message = "La contraseña es obligatoria")
    private String clave;

    // Constructors
    public LoginDTO() {}

    public LoginDTO(String usuario, String clave) {
        this.usuario = usuario;
        this.clave = clave;
    }

    // Getters and Setters
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}
