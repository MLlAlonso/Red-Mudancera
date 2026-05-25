"use client";

import { useEffect, useState } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { getEmpresas, addCreditos, changePlan, createPartner, deleteEmpresa } from "@/services/superAdmin";
import "@/styles/pages/superadmin/_superAdminEmpresas.scss";

export default function SuperAdminEmpresasPage() {
    const [metrics, setMetrics] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [partner, setPartner] = useState({ nombre: "" });

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

    useEffect(() => {
        loadData();
    }, [search]);

    const loadData = async () => {
        const data = await getEmpresas(search);
        setEmpresas(data.data);
        setMetrics(data.metrics);
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
        alert("Partner creado");
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
                                <tr key={empresa.id}>
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
                                                <span className="status pending">
                                                    Pendiente
                                                </span>
                                            )
                                        }
                                    </td>

                                    <td>
                                        <div className="table-actions">
                                            <button onClick={() => handleCreditos(empresa.id)}>
                                                Créditos
                                            </button>

                                            <button onClick={() => handlePlan(empresa.id)}>
                                                Plan
                                            </button>

                                            <button className="delete-btn" onClick={() => handleDelete(empresa)} title="Eliminar empresa" >
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
        </SuperAdminLayout>
    );
}