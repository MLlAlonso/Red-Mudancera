"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_crud from "@/components/common/Button_crud";
import Button_error from "@/components/common/Button_error";
import Button_success from "@/components/common/Button_success";
import Input from "@/components/common/Input";
import UserCard from "@/components/cards/UserCard";

import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton";

import "@/styles/pages/empresa/_empresaUsuarios.scss";

export default function EmpresaUsuarios() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [empresaCodigo, setEmpresaCodigo] = useState("");
  
  // MODALES
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(null);
  const [modalSuccessDelete, setModalSuccessDelete] = useState(false);
  const [modalSuccessPause, setModalSuccessPause] = useState(false);
  const [modalSuccessResume, setModalSuccessResume] = useState(false);

  // FORMULARIO
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    codigoEmpresa: "",
  });

  const DEFAULT_PASSWORD = "Mudanzas123";

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  // Obtener códigoEmpresa
  const fetchEmpresa = () => {
    const token = getCookie("token_empresa");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpresaCodigo(data.codigoEmpresa);
      });
  };

  // Obtener usuarios
  const fetchUsuarios = () => {
    const token = getCookie("token_empresa");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data.usuarios || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmpresa();
    fetchUsuarios();
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Registrar usuario
  const handleSubmit = async () => {
    const payload = {
      ...form,
      password: DEFAULT_PASSWORD,
      codigoEmpresa: empresaCodigo,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/usuario/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
      alert(
        data.message ||
        "Este correo ya está registrado. Intenta con otro."
      );
      return;
    }

      setModalOpen(false);

      setForm({
        nombre: "", email: "", telefono: "",
      });

      fetchUsuarios();
    } catch (err) {
      console.log(err);
      alert("Intenta con otro correo, este probablemente ya está registrado.");
    }
  };

  // Confirmar eliminación
  const askDelete = (id) => {
    setModalConfirmDelete(id);
  };

  const confirmDelete = async () => {
    const id = modalConfirmDelete;
    const token = getCookie("token_empresa");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/usuario/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setModalConfirmDelete(null);
    setModalSuccessDelete(true);
    fetchUsuarios();
    setTimeout(() => setModalSuccessDelete(false), 2500);
  };

  // Pausar / Reanudar usuario
  const handlePauseToggle = async (id) => {
    const token = getCookie("token_empresa");
    const usuario = usuarios.find((u) => u.id === id);
    const endpoint = usuario.activoEmpresa ? "pausar" : "reanudar";

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/empresa/usuario/${id}/${endpoint}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await fetchUsuarios();

    if (usuario.activoEmpresa) {
      setModalSuccessPause(true);
      setTimeout(() => setModalSuccessPause(false), 2000);
    } else {
      setModalSuccessResume(true);
      setTimeout(() => setModalSuccessResume(false), 2000);
    }
  };

  // Compartir por WhatsApp sin que desaparezca el mensaje
  const handleShare = (usuario) => {
    const mensaje =
      "Hola bienvenido(a) " + usuario.nombre +
      " a M3.%0A%0A" +
      "Te comparto tu usuario y contraseña:%0A" +
      "Usuario: " + usuario.email +
      "%0A" +
      "Contraseña: " + DEFAULT_PASSWORD +
      "%0A%0A" +
      "Inicia sesión aquí:%0A" +
      "https://app.mudanzafacil.com.mx/usuario/login";

    const url = `https://wa.me/52${usuario.telefono}?text=${mensaje}`;
    window.open(url, "_blank");
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <Header />

      <main className="empresa-usuarios">
        <div className="empresa-usuarios__header">
          <div>
            <h1 className="empresa-usuarios__title">Mis usuarios</h1>
            <p className="empresa-usuarios__subtitle">Miembros de mi equipo</p>
          </div>

          <Button_crud value="Añadir" onClick={() => setModalOpen(true)} />
        </div>

        <div className="empresa-usuarios__grid">
          {usuarios.map((u) => (
            <UserCard
              key={u.id}
              avatar={u.avatar}
              nombre={u.nombre}
              telefono={u.telefono}
              email={u.email}
              activo={Boolean(u.activoEmpresa)}
              fechaUnion={new Date(u.created_at).toLocaleDateString()}
              onDelete={() => askDelete(u.id)}
              onPause={() => handlePauseToggle(u.id)}
              onShare={() => handleShare(u)}
            />
          ))}
        </div>
      </main>

      <Footer />

      {/* ===============================
          MODAL REGISTRO
      =============================== */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal__title">Registrar usuario</h2>

            <Input label="Nombre" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleInput}/>
            <Input label="Correo" name="email" placeholder="Correo" value={form.email} onChange={handleInput}/>
            <Input label="Teléfono" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleInput}/>

            <Button_crud value="Registrar" onClick={handleSubmit} />
          </div>
        </div>
      )}

      {/* ===============================
          MODAL CONFIRMAR ELIMINACIÓN
      =============================== */}
      {modalConfirmDelete && (
        <div className="empresa-delete__modal">
          <div className="empresa-delete__box">
            <h2>¿Eliminar usuario?</h2>
            <p>Esta acción es permanente.</p>

            <div className="empresa-delete__buttons">
              <Button_error value="Cancelar" onClick={() => setModalConfirmDelete(null)} />
              <Button_success value="Aceptar" onClick={confirmDelete} />
            </div>
          </div>
        </div>
      )}

      {/* ===============================
          MODAL ÉXITO: Eliminado
      =============================== */}
      {modalSuccessDelete && (
        <div className="empresa-editar__modal">
          <div className="empresa-editar__modal-box">
            <img src="/icons/check.png" className="empresa-editar__modal-icon" />
            <p>El usuario ha sido eliminado correctamente</p>
          </div>
        </div>
      )}

      {/* ===============================
          MODAL ÉXITO: Pausado
      =============================== */}
      {modalSuccessPause && (
        <div className="empresa-editar__modal">
          <div className="empresa-editar__modal-box">
            <img src="/icons/check.png" className="empresa-editar__modal-icon" />
            <p>El usuario ha sido pausado correctamente</p>
          </div>
        </div>
      )}

      {/* ===============================
          MODAL ÉXITO: Reanudado
      =============================== */}
      {modalSuccessResume && (
        <div className="empresa-editar__modal">
          <div className="empresa-editar__modal-box">
            <img src="/icons/check.png" className="empresa-editar__modal-icon" />
            <p>El usuario ha reanudado sus actividades</p>
          </div>
        </div>
      )}
    </>
  );
}