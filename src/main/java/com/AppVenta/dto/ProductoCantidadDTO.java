package com.AppVenta.dto;

import com.AppVenta.model.Producto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductoCantidadDTO {

    private Long codigo_producto;
    private Producto producto;
    private int cantidad;
}
