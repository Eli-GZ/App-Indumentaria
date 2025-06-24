package com.AppVenta.service;

import com.AppVenta.model.Producto;
import com.AppVenta.repository.IProductoRepository;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

public class ProductoServiceIT {

    @Mock
    private IProductoRepository ProduRepo;
    @InjectMocks
    private ProductoService productoService;

    private Producto producto;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        producto = new Producto();
        producto.setCodigo_producto(20L);
        producto.setNombre("Campera");
        producto.setTalle("T1-T10");
        producto.setCantidad_disponible(2.0);

    }

    @Test
    public void testGetProductos() {
        when(ProduRepo.findAll()).thenReturn(Arrays.asList(producto));        
        assertNotNull(productoService.getProductos());
    }

}
