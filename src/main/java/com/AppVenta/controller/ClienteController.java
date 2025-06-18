package com.AppVenta.controller;

import com.AppVenta.exception.NoEncontradoExcepcion;
import com.AppVenta.model.Cliente;
import com.AppVenta.service.IClienteService;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("app-venta")
@CrossOrigin(value = "http://localhost:3000")
public class ClienteController {
    
    @Autowired
    private IClienteService clientServ;

    //ENDPOINT para obtener un cliente
    @GetMapping("/clientes/{id_cliente}")
    public ResponseEntity<Cliente> getCliente(@PathVariable Long id_cliente) {
        Cliente clien = clientServ.findCliente(id_cliente);
        if (clien == null) {
            throw new NoEncontradoExcepcion("No se encontró el ID del cliente: " + id_cliente);
        }
        return ResponseEntity.ok(clien);
    }

    //ENDPOINT para obtener todos los clientes
    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> getClientes() {
        List<Cliente> clien = clientServ.getClientes();
        return ResponseEntity.ok(clien);
    }

    //ENDPOINT para crear un nuevo cliente
    @PostMapping("/clientes/crear")
    public String createCliente(@RequestBody Cliente clien) {
        clientServ.saveCliente(clien);
        //mensaje de creacion correcta
        return "El cliente fue creado correctamente";
    }

    //ENDPOINT para eliminar un cliente
    @DeleteMapping("/clientes/eliminar/{id_cliente}")
    public String deleteCliente(@PathVariable Long id_cliente) {

        //confirmar que existe un cliente        
        Cliente clien = clientServ.findCliente(id_cliente);
        
        if (clien != null) {
            clientServ.deleteCliente(id_cliente);
            //mensaje de eliminacion correcta
            return "El cliente fue eliminado correctamente";
        } else {
            return "No se encontro el id del cliente";
        }
    }

    //ENDPOINT para modificar un nuevo cliente
    @PutMapping("/clientes/editar/{id_cliente}")
    public ResponseEntity<Cliente> editCliente(@PathVariable Long id_cliente,
            @RequestBody Cliente clieRecibido) {
        //Envio id original(para buscar)
        Cliente clien = clientServ.findCliente(id_cliente);
        
        //Corroborar que el producto exista
        if (clien == null) {
            throw new NoEncontradoExcepcion("No se encontró el ID del cliente: " + id_cliente);
        }
        //Enviar nuevos datos para modificar
        clien.setNombre(clieRecibido.getNombre());
        clien.setApellido(clieRecibido.getApellido());
        clien.setDni(clieRecibido.getDni());
        clientServ.saveCliente(clien);
        
        return ResponseEntity.ok(clien);
    }
    
}
