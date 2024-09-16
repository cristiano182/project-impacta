import { useState } from "react";
import styles from "./modal.module.css";

export default function Modal(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')


  return (<>
    <div className={styles.container} onClick={props.handleModal} />
    <div className={styles.modal}>
    <div className={styles.modalHeader}>{props.create ? 'Cadastrar Evento' : 'Editar Evento'}</div>
    <div className={styles.modalBody}>

    <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputModal}
            placeholder=" Titulo do Evento"
          />

<input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputModal}
            placeholder=" Descricao do Evento"
          />

<input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
            className={styles.inputModal}
            placeholder=" Data do Evento"
          />
      
    </div>
    <div className={styles.modalFooter}>
       <button onClick={() => {}} className={styles.confirmButton}>
            Confirmar
          </button>
    </div>
    </div></>)
}
