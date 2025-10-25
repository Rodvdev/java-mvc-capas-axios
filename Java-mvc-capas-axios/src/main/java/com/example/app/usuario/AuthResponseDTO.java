package com.example.app.usuario;

public class AuthResponseDTO {

    private boolean exito;
    private String mensaje;
    private String nombre;
    private String token;

    // Constructors
    public AuthResponseDTO() {}

    public AuthResponseDTO(boolean exito, String mensaje) {
        this.exito = exito;
        this.mensaje = mensaje;
    }

    public AuthResponseDTO(boolean exito, String mensaje, String nombre, String token) {
        this.exito = exito;
        this.mensaje = mensaje;
        this.nombre = nombre;
        this.token = token;
    }

    // Getters and Setters
    public boolean isExito() {
        return exito;
    }

    public void setExito(boolean exito) {
        this.exito = exito;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
