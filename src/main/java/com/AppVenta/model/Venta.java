package com.AppVenta.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codigo_venta;
    @Column(name = "fecha_venta")
    private LocalDate fechaVenta;
    private Double total;

    @ManyToMany
    private List<Producto> listaProductos;

    @ManyToOne
    @JoinColumn(name = "un_cliente_id_cliente", referencedColumnName = "id_cliente")
    private Cliente unCliente;
 
    

}
