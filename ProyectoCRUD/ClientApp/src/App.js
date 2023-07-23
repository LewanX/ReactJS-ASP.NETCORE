import { useState,useEffect } from "react"
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap"
import ModalContacto from "./componentes/ModalContacto"
import TablaContacto from "./componentes/TablaContacto"


const App = () => {
    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);
    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/Lista");
        if (response.ok) {
            const data = await response.json();
            setContactos(data)
        } else {
            console.log("error en lista")
        }
    }
    useEffect(() => {
        mostrarContactos();

    },[])
    const guardarContacto = async (contacto) => {
        const respone = await fetch("api/contacto/Guardar", {
            method:'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (respone.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }
    const editarContacto = async (contacto) => {
        const respone = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (respone.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }
    const eliminarContacto = async (id) => {
        var respuesta = window.confirm("desea eliminar el contacto?");
        console.log("...")
        if (!respuesta) {
            return;
        }
        const respone = await fetch("api/contacto/Eliminar/" + id, {
            method:'DELETE',
        })
         
       
        if (respone.ok) {
          
            mostrarContactos();
        }
    }


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={()=> setMostrarModal(!mostrarModal)}>Nuevo Contacto</Button>
                            <hr></hr>
                            <TablaContacto data={contactos} setEditar={setEditar} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} eliminarContacto={eliminarContacto} />
                                
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
                
            />
        </Container>
    
    )

}
export default App;