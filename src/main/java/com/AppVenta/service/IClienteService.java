
package com.AppVenta.service;

import com.AppVenta.model.Cliente;
import java.util.List;


public interface IClienteService {
      //Traer todos los productos
    public List<Cliente> getClientes();

    //Guardar una producto 
    public void saveCliente(Cliente clien);

    //Borrar un producto
    public void deleteCliente(Long id_cliente);

    //Encontrar un producto
    public Cliente findCliente(Long id_cliente);

    //Editar persona
    public void editCliente(Long id_cliente, String nombreNuevo, String apellidoNuevo, String dniNuevo);

    public void editCliente(Cliente clien);
}
