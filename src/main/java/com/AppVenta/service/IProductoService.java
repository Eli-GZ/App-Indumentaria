
package com.AppVenta.service;

import com.AppVenta.model.Producto;
import java.util.List;


public interface IProductoService {
      
    //Traer todos los productos
    public List<Producto> getProductos();

    //Guardar una producto 
    public void saveProducto(Producto produ);

    //Borrar un producto
    public void deleteProducto(Long codigo_producto);

    //Encontrar un producto
    public Producto findProducto(Long codigo_producto);
    
}
