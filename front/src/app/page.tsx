"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./modal";
import Loading from "./loading";
import styles from "./page.module.css";

export default function Home() {
  const [modal, setModal] = useState({ show: false });
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(
      `http://localhost:5001/api/event?title=${searchText}`,
    );
    const events = await data.json();
    setShows(events);
    setLoading(false);
  };

  const deleteEvent = async (id) => {
    setLoading(true);
    await fetch(`http://localhost:5001/api/event/${id}`, { method: "delete" });
    setShows((prev) => prev.filter((event) => event.id !== id));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    fetchData();
  }, []);

  const handleModal = () => {
    setModal(prev => !prev.show)
  }

  return (
    <div className={styles.page}>
      {loading ? <Loading /> : ""}
      {modal.show ? <Modal handleModal={handleModal} /> : ""}
      <main className={styles.main}>
        <h1 className={styles.title}>Gerenciamento de Eventos</h1>
        <h3 className={styles.subTitle}>
          <i>Cadastre e gerencie shows & eventos</i>
        </h3>

        <div className={styles.searchContainer}>
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.inputSearch}
            placeholder=" Pesquisar evento por nome"
          />
          <button onClick={() => fetchData()} className={styles.searchButton}>
            Pesquisar
          </button>
          <button className={styles.createButton}>Cadastrar Evento</button>
        </div>
        <div className={styles.list}>
          {shows.length > 0 ? (
            shows.map((show, id) => {
              return (
                <div key={id} className={styles.card}>
                  <Image
                    aria-hidden
                    src={show.image}
                    alt="File icon"
                    width={320}
                    height={180}
                  />

                  <div className={styles.cardTitle}>
                    <h2> {show.title}</h2>
                  </div>

                  <div className={styles.cardDescription}>
                    {show.description}
                  </div>

                  <div className={styles.cardDate}>
                    <code>
                      Data: {new Date(show.data).toLocaleDateString()}
                    </code>
                  </div>

                  <div className={styles.cardFooter}>
                    <button
                      onClick={() => setModal({ show: true })}
                      className={styles.editButton}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteEvent(show.id)}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              {" "}
              <br /> <br /> <br /> <br /> <h1>Nenhum show encontrado.</h1>{" "}
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <Image
          aria-hidden
          src="https://nextjs.org/icons/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        <h5>
          {" "}
          Cristiano Oliveira dos Santos - Impacta - Software Product: Analysis,
          Specification, Project & Implementation{" "}
        </h5>
      </footer>
    </div>
  );
}
