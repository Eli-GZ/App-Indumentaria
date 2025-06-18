package com.AppVenta.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoEncontradoExcepcion extends RuntimeException {

    public NoEncontradoExcepcion(String mensaje) {
        super(mensaje);
    }
}
