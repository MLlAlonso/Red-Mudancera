"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import {
    getEmpresas,
    addCreditos,
    changePlan,
    createPartner,
    deleteEmpresa,
    verifyEmpresa,
    getPartners,
    updatePartner,
    deletePartnerById
} from "@/services/superAdmin";
import "@/styles/pages/superadmin/_superAdminEmpresas.scss";

export default function SuperAdminEmpresasPage() {
    const router = useRouter();
    const [metrics, setMetrics] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [partner, setPartner] = useState({ nombre: "" });
    const [partners, setPartners] = useState([]);

    const [editPartnerModal, setEditPartnerModal] = useState({
        open: false,
        id: null,
        nombre: ""
    });

    const [deletePartnerModal, setDeletePartnerModal] = useState({
        open: false,
        id: null,
        nombre: ""
    });

    const [creditosModal, setCreditosModal] = useState({
        open: false,
        empresaId: null,
        cantidad: ""
    });

    const [planModal, setPlanModal] = useState({
        open: false,
        empresaId: null,
        plan: "free"
    });

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        empresaId: null,
        empresaNombre: ""
    });

    const [verifyModal, setVerifyModal] = useState({
        open: false,
        empresaId: null,
        empresaNombre: ""
    });

    useEffect(() => {
        loadData();
    }, [search]);

    const loadData = async () => {
        const [empresasData, partnersData] =
            await Promise.all([
                getEmpresas(search),
                getPartners()
            ]);

        setEmpresas(empresasData.data);
        setMetrics(empresasData.metrics);
        setPartners(partnersData.data);
    };

    const handleCreditos = (id) => {
        setCreditosModal({
            open: true,
            empresaId: id,
            cantidad: ""
        });
    };

    const handlePlan = (id) => {
        setPlanModal({
            open: true,
            empresaId: id,
            plan: "free"
        });
    };

    const handlePartner = async () => {
        await createPartner(partner);

        setPartner({
            nombre: ""
        });

        loadData();
        alert("Partner creado");
    };

    const submitEditPartner = async () => {
        await updatePartner(
            editPartnerModal.id,
            {
                nombre: editPartnerModal.nombre
            }
        );

        setEditPartnerModal({
            open: false,
            id: null,
            nombre: ""
        });

        loadData();
    };

    const submitDeletePartner = async () => {
        await deletePartnerById(
            deletePartnerModal.id
        );

        setDeletePartnerModal({
            open: false,
            id: null,
            nombre: ""
        });

        loadData();
    };

    const submitCreditos = async () => {
        if (!creditosModal.cantidad) return;
        await addCreditos(
            creditosModal.empresaId,
            creditosModal.cantidad
        );
        setCreditosModal({
            open: false,
            empresaId: null,
            cantidad: ""
        });
        loadData();
    };

    const submitPlan = async () => {
        await changePlan(
            planModal.empresaId,
            planModal.plan
        );
        setPlanModal({
            open: false,
            empresaId: null,
            plan: "free"
        });
        loadData();
    };

    const submitVerify = async () => {
        try {
            await verifyEmpresa(verifyModal.empresaId);

            setVerifyModal({
                open: false,
                empresaId: null,
                empresaNombre: ""
            });

            loadData();
        } catch (error) {
            alert("No se pudo verificar la empresa");
        }
    };

    const handleVerifyEmpresa = (empresa) => {
        setVerifyModal({
            open: true,
            empresaId: empresa.id,
            empresaNombre: empresa.empresa
        });
    };

    const handleDelete = (empresa) => {
        setDeleteModal({
            open: true,
            empresaId: empresa.id,
            empresaNombre: empresa.empresa
        });
    };

    const submitDelete = async () => {
        try {
            await deleteEmpresa(deleteModal.empresaId);
            setDeleteModal({
                open: false,
                empresaId: null,
                empresaNombre: ""
            });
            loadData();
        } catch (err) {
            alert(err.message);
        }
    };

    const totalItems = empresas.length;

    const totalPages =
        perPage === "all"
            ? 1
            : Math.ceil(totalItems / perPage);

    const paginatedEmpresas =
        perPage === "all"
            ? empresas
            : empresas.slice(
                (currentPage - 1) * perPage,
                currentPage * perPage
            );

    return (
        <SuperAdminLayout title="Empresas" subtitle="Administración global">
            <section className="superadmin-tools">
                {
                    metrics && (
                        <section className="empresas-metrics">
                            {/* EMPRESAS */}
                            <article className="metric-card success">
                                <span>
                                    Nuevas este mes
                                </span>

                                <strong>
                                    {metrics.empresas_mes}
                                </strong>
                            </article>



                            {/* PREMIUM */}
                            <article className="metric-card premium">
                                <span>
                                    Empresas premium
                                </span>

                                <strong>
                                    {metrics.premium_total}
                                </strong>
                            </article>

                            <article className="metric-card">
                                <span>
                                    Plan Radar
                                </span>

                                <strong>
                                    {metrics.premium_radar}
                                </strong>
                            </article>

                            <article className="metric-card">
                                <span>
                                    Plan Conector
                                </span>

                                <strong>
                                    {metrics.premium_conector}
                                </strong>
                            </article>

                            <article className="metric-card warning">
                                <span>
                                    Trials activos
                                </span>

                                <strong>
                                    {metrics.trials_activos}
                                </strong>
                            </article>

                            {/* VERIFICACIÓN */}
                            <article className="metric-card danger">
                                <span>
                                    Sin verificar
                                </span>

                                <strong>
                                    {metrics.sin_verificar}
                                </strong>
                            </article>

                            {/* NEGOCIO */}
                            <article className="metric-card">
                                <span>
                                    Leads comprados
                                </span>

                                <strong>
                                    {metrics.leads_mes}
                                </strong>
                            </article>

                            <article className="metric-card dark">
                                <span>
                                    Créditos consumidos
                                </span>

                                <strong>
                                    {metrics.creditos_mes}
                                </strong>
                            </article>

                            {/* PARTNERS */}
                            <article className="metric-card partner">
                                <span>
                                    Partners activos
                                </span>

                                <strong>
                                    {metrics.partners_activos}
                                </strong>
                            </article>
                        </section>
                    )
                }
            </section>

            <section className="empresas-table-wrapper">
                <div className="search-box">
                    <img src="/icons/lupa.png" alt="Buscar" />
                    <input type="text" placeholder="Busca por nombre, correo, RFC..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="pagination-top">
                    <div className="pagination-select">
                        <span> Mostrar: </span>

                        <select value={perPage}
                            onChange={(e) => {
                                const value =
                                    e.target.value === "all"
                                        ? "all"
                                        : Number(e.target.value);
                                setPerPage(value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="all">Todos</option>
                        </select>
                    </div>
                </div>

                <table className="empresas-table">
                    <thead>
                        <tr>
                            <th> Empresa </th>
                            <th> Plan </th>
                            <th> Créditos </th>
                            <th> Trial </th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            paginatedEmpresas.map((empresa) => (
                                <tr key={empresa.id} className="clickable-row" onClick={() => router.push(`/empresa/${empresa.id}`)}>
                                    <td>
                                        <div className="empresa-user">
                                            <div className="empresa-user__logo">
                                                {
                                                    empresa.logo ? (
                                                        <img src={empresa.logo} alt={empresa.empresa} />
                                                    ) : (
                                                        <span>
                                                            {empresa.empresa?.charAt(0)}
                                                        </span>
                                                    )
                                                }
                                            </div>

                                            <div>
                                                <h3>
                                                    {empresa.empresa}
                                                </h3>

                                                <p>
                                                    {empresa.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span className={`plan-badge ${empresa.plan}`}>
                                            {empresa.plan || "free"}
                                        </span>
                                    </td>

                                    <td>
                                        {empresa.tokens}
                                    </td>

                                    <td>
                                        {
                                            empresa.isTrial ? (
                                                <span className="status warning">
                                                    Trial
                                                </span>

                                            ) : (

                                                <span className="status inactive">
                                                    No
                                                </span>
                                            )
                                        }
                                    </td>

                                    <td>
                                        {
                                            empresa.verificado ? (
                                                <span className="status verified">
                                                    Verificada
                                                </span>
                                            ) : (
                                                <button
                                                    className="verify-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleVerifyEmpresa(empresa);
                                                    }}
                                                >
                                                    Verificar
                                                </button>
                                            )
                                        }
                                    </td>

                                    <td>
                                        <div className="table-actions">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCreditos(empresa.id);
                                                }}
                                            >
                                                Créditos
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePlan(empresa.id);
                                                }}
                                            >
                                                Plan
                                            </button>

                                            <button
                                                className="delete-btn"
                                                title="Eliminar empresa"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(empresa);
                                                }}
                                            >
                                                <img src="/icons/delete.png" alt="Eliminar" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {
                    perPage !== "all" && totalPages > 1 && (
                        <div className="pagination">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} >
                                Anterior
                            </button>

                            <span>
                                Página {currentPage} de {totalPages}
                            </span>

                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} >
                                Siguiente
                            </button>
                        </div>
                    )
                }
            </section>

            <section className="partner-box">
                <div className="partner-box__content">
                    <div>
                        <h2>
                            Crear partner
                        </h2>
                    </div>

                    <div className="partner-box__form">
                        <input type="text" placeholder="Nombre del partner" value={partner.nombre} onChange={(e) => setPartner({ nombre: e.target.value })} />

                        <button onClick={handlePartner}>
                            Crear
                        </button>
                    </div>
                </div>
            </section>

            <section className="partners-table-wrapper">
                <h2> Partners registrados</h2>

                <table className="partners-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Slug</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            partners.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.slug}</td>

                                    <td>
                                        {
                                            item.activo ? (
                                                <span className="status verified">
                                                    Activo
                                                </span>
                                            ) : (
                                                <span className="status inactive">
                                                    Inactivo
                                                </span>
                                            )
                                        }
                                    </td>

                                    <td>
                                        <div className="table-actions">
                                            <button
                                                onClick={() =>
                                                    setEditPartnerModal({
                                                        open: true,
                                                        id: item.id,
                                                        nombre: item.nombre
                                                    })
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    setDeletePartnerModal({
                                                        open: true,
                                                        id: item.id,
                                                        nombre: item.nombre
                                                    })
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </section>

            {
                creditosModal.open && (
                    <div className="admin-modal-overlay">
                        <div className="admin-modal">
                            <h2> Agregar créditos </h2>

                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={creditosModal.cantidad}
                                onChange={(e) =>
                                    setCreditosModal({
                                        ...creditosModal,
                                        cantidad: e.target.value
                                    })
                                }
                            />

                            <div className="admin-modal__actions">
                                <button
                                    className="secondary"
                                    onClick={() =>
                                        setCreditosModal({
                                            open: false,
                                            empresaId: null,
                                            cantidad: ""
                                        })
                                    }
                                >
                                    Cancelar
                                </button>

                                <button onClick={submitCreditos}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                planModal.open && (
                    <div className="admin-modal-overlay">
                        <div className="admin-modal">
                            <h2> Cambiar plan </h2>

                            <select
                                value={planModal.plan}
                                onChange={(e) =>
                                    setPlanModal({
                                        ...planModal,
                                        plan: e.target.value
                                    })
                                }
                            >

                                <option value="free"> Free </option>
                                <option value="conector"> Conector </option>
                                <option value="radar"> Radar </option>
                            </select>

                            <div className="admin-modal__actions">
                                <button
                                    className="secondary"
                                    onClick={() =>
                                        setPlanModal({
                                            open: false,
                                            empresaId: null,
                                            plan: "free"
                                        })
                                    }
                                >
                                    Cancelar
                                </button>

                                <button onClick={submitPlan}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                verifyModal.open && (
                    <div className="admin-modal-overlay" id="verify-modal">
                        <div className="admin-modal">
                            <h2>
                                Verificar empresa
                            </h2>

                            <p>
                                ¿Deseas verificar manualmente la empresa?
                            </p>

                            <strong className="verify-company">
                                {verifyModal.empresaNombre}
                            </strong>

                            <p>
                                La empresa podrá acceder inmediatamente a las funciones que requieren verificación.
                            </p>

                            <div className="admin-modal__actions">
                                <button className="success-btn" onClick={submitVerify} >
                                    Verificar
                                </button>

                                <button
                                    className="secondary"
                                    onClick={() =>
                                        setVerifyModal({
                                            open: false,
                                            empresaId: null,
                                            empresaNombre: ""
                                        })
                                    }
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                deleteModal.open && (
                    <div className="admin-modal-overlay">
                        <div className="admin-modal danger">
                            <h2> Eliminar empresa </h2>

                            <p className="danger-text">
                                Estás a punto de eliminar permanentemente:
                            </p>

                            <strong className="danger-company">
                                {deleteModal.empresaNombre}
                            </strong>

                            <p className="danger-warning">
                                Esta acción NO tiene reversa.
                                <br /><br />
                                También se eliminarán:
                            </p>

                            <ul className="danger-list">
                                <li>Servicios activos</li>
                                <li>Solicitudes</li>
                                <li>Referidos</li>
                            </ul>

                            <div className="admin-modal__actions">
                                <button className="danger-btn" onClick={submitDelete} >
                                    Eliminar definitivamente
                                </button>

                                <button
                                    className="secondary"
                                    onClick={() =>
                                        setDeleteModal({
                                            open: false, empresaId: null, empresaNombre: ""
                                        })}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                editPartnerModal.open && (
                    <div className="admin-modal-overlay">
                        <div className="admin-modal">
                            <h2> Editar partner</h2>

                            <input
                                type="text"
                                value={editPartnerModal.nombre}
                                onChange={(e) =>
                                    setEditPartnerModal({
                                        ...editPartnerModal,
                                        nombre: e.target.value
                                    })
                                }
                            />

                            <div className="admin-modal__actions">
                                <button
                                    className="secondary"
                                    onClick={() =>
                                        setEditPartnerModal({
                                            open: false,
                                            id: null,
                                            nombre: ""
                                        })
                                    }
                                >
                                    Cancelar
                                </button>

                                <button onClick={submitEditPartner}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                deletePartnerModal.open && (
                    <div className="admin-modal-overlay">
                        <div className="admin-modal danger">
                            <h2> Eliminar partner</h2>
                            <p> ¿Deseas eliminar:</p>
                            <strong> {deletePartnerModal.nombre}</strong>

                            <div className="admin-modal__actions">
                                <button className="danger-btn" onClick={submitDeletePartner}>
                                    Eliminar
                                </button>

                                <button
                                    className="secondary"
                                    onClick={() =>
                                        setDeletePartnerModal({
                                            open: false,
                                            id: null,
                                            nombre: ""
                                        })
                                    }
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </SuperAdminLayout>
    );
}