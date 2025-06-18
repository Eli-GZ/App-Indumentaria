package com.AppVenta.service;

import com.AppVenta.model.Producto;
import com.AppVenta.repository.IProductoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository ProduRepo;

    @Override
    public List<Producto> getProductos() {
        List<Producto> listaProductos = ProduRepo.findAll();
        return listaProductos;
    }

    @Override
    public void saveProducto(Producto produ) {
        ProduRepo.save(produ);
    }

    @Override
    public void deleteProducto(Long codigo_producto) {
        ProduRepo.deleteById(codigo_producto);
    }

    @Override
    public Producto findProducto(Long codigo_producto) {
        Producto produ = ProduRepo.findById(codigo_producto).orElse(null);
        return produ;
    }

    @Override
    public void editProducto(Long codigo_producto, String nombreNuevo, String talleNuevo, Double costoNuevo, Double NuevaCantidad_disponible) {
        Producto produ = this.findProducto(codigo_producto);

        //proceso de modificacion a nivel logico
        produ.setNombre(nombreNuevo);
        produ.setTalle(talleNuevo);
        produ.setCosto(costoNuevo);
        produ.setCantidad_disponible(NuevaCantidad_disponible);

        //guardar cambios
        this.saveProducto(produ);
    }

    @Override
    public void editProducto(Producto produ) {
        this.saveProducto(produ);
    }

}
