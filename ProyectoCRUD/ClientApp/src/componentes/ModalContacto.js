import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"
import { useState, useEffect } from "react"
const modeloContacto = {
    idContacto:0,
    nombre: "",
    correo: "",
    telefono:""
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar,setEditar,editarContacto }) => {
    const [contacto, setContacto] = useState(modeloContacto);
    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setContacto(
            {
                ...contacto,
                [e.target.name]: e.target.value
            }
        )
    }
    const enviarDatos = () => {
        if (contacto.idContacto == 0) {
            guardarContacto(contacto);
        } else {
            editarContacto(contacto);
        }
        setContacto(modeloContacto);
    }
    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modeloContacto)
        }
    }, [editar])
    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null);
    }
    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idContacto==0 ? "Nuevo Contacto" : "editar Contacto"}

              
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>


    )
}
export default ModalContacto;