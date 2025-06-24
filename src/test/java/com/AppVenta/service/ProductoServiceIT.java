
package com.AppVenta.service;

import com.AppVenta.model.Producto;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 *
 * @author elias
 */
public class ProductoServiceIT {
    
    public ProductoServiceIT() {
    }
    
    @BeforeAll
    public static void setUpClass() {
    }
    
    @AfterAll
    public static void tearDownClass() {
    }
    
    @BeforeEach
    public void setUp() {
    }
    
    @AfterEach
    public void tearDown() {
    }

    @Test
    public void testGetProductos() {
        System.out.println("getProductos");
        ProductoService instance = new ProductoService();
        List<Producto> expResult = null;
        List<Producto> result = instance.getProductos();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of saveProducto method, of class ProductoService.
     */
    @Test
    public void testSaveProducto() {
        System.out.println("saveProducto");
        Producto produ = null;
        ProductoService instance = new ProductoService();
        instance.saveProducto(produ);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of deleteProducto method, of class ProductoService.
     */
    @Test
    public void testDeleteProducto() {
        System.out.println("deleteProducto");
        Long codigo_producto = null;
        ProductoService instance = new ProductoService();
        instance.deleteProducto(codigo_producto);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of findProducto method, of class ProductoService.
     */
    @Test
    public void testFindProducto() {
        System.out.println("findProducto");
        Long codigo_producto = null;
        ProductoService instance = new ProductoService();
        Producto expResult = null;
        Producto result = instance.findProducto(codigo_producto);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
