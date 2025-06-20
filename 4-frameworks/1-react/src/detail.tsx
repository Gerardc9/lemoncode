import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // Obtener la organización de los parámetros de URL
  const organization = searchParams.get("org") || "lemoncode";

  return (
    <>
      <h2>Detalle del usuario</h2>
      <h3>Usuario: {id}</h3>
      <p>Organización: {organization}</p>

      {/* Mantener la organización al volver a la lista */}
      <Link to={`/list?org=${organization}`}>
        ← Volver a la lista de {organization}
      </Link>
    </>
  );
};
