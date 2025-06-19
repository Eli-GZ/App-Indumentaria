package com.AppVenta.controller;

import com.AppVenta.exception.NoEncontradoExcepcion;
import com.AppVenta.model.Producto;
import com.AppVenta.service.IProductoService;
import com.AppVenta.service.IVentaService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("app-venta")
@CrossOrigin(value = "http://localhost:3000")
public class ProductoController {

    @Autowired
    private IProductoService producServ;

    //ENDPOINT para obtener un producto
    @GetMapping("/productos/{codigo_producto}")
    public ResponseEntity<Producto> getProducto(@PathVariable Long codigo_producto) {
        Producto produ = producServ.findProducto(codigo_producto);
        //Corroborar que el producto exista
        if (produ == null) {
            throw new NoEncontradoExcepcion("No se encontró el codigo del producto: " + codigo_producto);
        }
        return ResponseEntity.ok(produ);
    }

    //ENDPOINT para obtener todos los productos
    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> getProductos() {
        List<Producto> produ = producServ.getProductos();
        return ResponseEntity.ok(produ);
    }

    //ENDPOINT para crear un nuevo producto
    @PostMapping("/productos")
    public String createProducto(@RequestBody Producto produc) {
        producServ.saveProducto(produc);
        //mensaje de creacion correcta
        return "El producto fue creado correctamente";
    }

    //ENDPOINT para eliminar un producto
    @DeleteMapping("/productos/{codigo_producto}")
    public String deleteProducto(@PathVariable Long codigo_producto) {

        //confirmar que existe un producto
        Producto produ = producServ.findProducto(codigo_producto);

        if (produ != null) {
            producServ.deleteProducto(codigo_producto);
            //mensaje de eliminación correcta
            return "El producto fue eliminado correctamente";
        } else {
            return "No se encontro el codigo del producto";
        }
    }

    //ENDPOINT para modificar una producto
    @PutMapping("/productos/{codigo_producto}")
    public ResponseEntity<Producto> editProducto(@PathVariable Long codigo_producto,
            @RequestBody Producto produRecibido) {

        //busco el producto editado para mostrar
        Producto produ = producServ.findProducto(codigo_producto);
        //Corroborar que el producto exista
        if (produ == null) {
            throw new NoEncontradoExcepcion("No se encontró el codigo del producto: " + codigo_producto);
        }

        //Envio nuevos datos para modificar
        produ.setNombre(produRecibido.getNombre());
        produ.setTalle(produRecibido.getTalle());
        produ.setCantidad_disponible(produRecibido.getCantidad_disponible());
        produ.setCosto(produRecibido.getCosto());
        producServ.saveProducto(produ);

        return ResponseEntity.ok(produ);
    }

//***************************************
    //ENDPOINT para obtener todos los productos
    @GetMapping("/productos/falta_stock")
    public ResponseEntity<List<Producto>> faltaStock() {
        List<Producto> productos = producServ.getProductos();

        List<Producto> ProduMenosCinco = productos.stream().filter(p -> p.getCantidad_disponible() <= 5).collect(Collectors.toList());
        if (ProduMenosCinco.isEmpty()) {
            throw new NoEncontradoExcepcion("No se encontraron productos con menos de 5 unidades ");
        }

        return ResponseEntity.ok(ProduMenosCinco);
    }

}
