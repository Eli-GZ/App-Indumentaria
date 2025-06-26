package com.AppVenta.dto;

import com.AppVenta.model.Cliente;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class VentaDTO {

    private Long id_cliente;
    private Long codigo_venta;
    private LocalDate fecha_venta;
    private double total;
    private Cliente unCliente;
    private List<ProductoCantidadDTO> listaProductos;
}
