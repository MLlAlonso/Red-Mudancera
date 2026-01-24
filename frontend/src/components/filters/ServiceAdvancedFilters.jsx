"use client";

import { useState } from "react";

import Input from "@/components/common/Input";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

export default function ServiceAdvancedFilters({
  values,
  onChange,
  onApply,
  onClose,
}) {
  // Estado local (NO filtra hasta aplicar)
  const [localValues, setLocalValues] = useState(values);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onChange(localValues); // pasa filtros al dashboard
    onApply?.();           // por si lo usas o no
    onClose();             // cierra el panel
  };

  return (
    <div className="filters-panel">
      <Input
        label="Origen"
        name="origen"
        placeholder="Ciudad de origen"
        value={localValues.origen}
        onChange={handleChange}
        autocomplete
      />

      <Input
        label="Destino"
        name="destino"
        placeholder="Ciudad de destino"
        value={localValues.destino}
        onChange={handleChange}
        autocomplete
      />

     {/*  <Input
        label="Volumen mínimo (m³)"
        name="volumen"
        type="number"
        placeholder="Ej. 20"
        value={localValues.volumen}
        onChange={handleChange}
      />

      <Input
        label="Fecha inicio"
        name="fechaInicio"
        type="date"
        value={localValues.fechaInicio}
        onChange={handleChange}
      />

      <Input
        label="Fecha fin"
        name="fechaFin"
        type="date"
        value={localValues.fechaFin}
        onChange={handleChange}
      />

      <Input
        label="Base / sede empresa"
        name="sede"
        placeholder="Ej. Guadalajara"
        value={localValues.sede}
        onChange={handleChange}
      /> */}

      <div className="input-group">
        <label className="input-group__label">Tipo de carga</label>
        <select
          name="tipoCarga"
          className="input-group__field"
          value={localValues.tipoCarga}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="menaje">Menaje</option>
          <option value="vehiculo">Vehículo</option>
          <option value="menaje_vehiculo">Menaje + vehículo</option>
          <option value="otro">Otro</option>
          <option value="libre">Libre</option>
        </select>
      </div>

      <div className="actions">
        <Button_error
          value="Cancelar"
          onClick={onClose}
        />

        <Button_success
          value="Filtrar"
          onClick={handleApply}
        />
      </div>
    </div>
  );
}
