import React from "react";
import { Link, useSearchParams } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organization, setOrganization] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  // Función para buscar miembros de una organización
  const fetchMembers = React.useCallback(async (org: string) => {
    if (!org.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/orgs/${org}/members`
      );

      if (!response.ok) {
        throw new Error(`Organización "${org}" no encontrada`);
      }

      const json = await response.json();
      setMembers(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar los miembros"
      );
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos iniciales y cuando se actualiza la URL
  React.useEffect(() => {
    const orgFromUrl = searchParams.get("org") || "lemoncode";
    setOrganization(orgFromUrl);

    // Solo buscar si hay una organización en la URL o es la carga inicial
    fetchMembers(orgFromUrl);
  }, [searchParams, fetchMembers]);

  // Manejar la búsqueda al hacer click en el botón
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (organization.trim()) {
      // Actualizar la URL con la organización - esto disparará el useEffect de arriba
      setSearchParams({ org: organization.trim() });
    }
  };

  return (
    <>
      <h2>Miembros de organizaciones GitHub</h2>

      {/* Formulario de búsqueda */}
      <div>
        <form onSubmit={handleSearch}>
          <div>
            <label htmlFor="organization">Organización:</label>
            <input
              id="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Ej: lemoncode, microsoft, google..."
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>
      </div>

      {/* Mostrar organización actual */}
      <h3>Organización: {searchParams.get("org") || "lemoncode"}</h3>

      {/* Mensajes de estado */}
      {error && <div>Error: {error}</div>}

      {isLoading && <div>Cargando miembros...</div>}

      {/* Lista de miembros */}
      {!isLoading && !error && members.length > 0 && (
        <div className="list-user-list-container">
          <span className="list-header">Avatar</span>
          <span className="list-header">ID</span>
          <span className="list-header">Nombre</span>
          {members.map((member) => (
            <React.Fragment key={member.id}>
              <img src={member.avatar_url} alt={member.login} />
              <span>{member.id}</span>
              <Link
                to={`/detail/${member.login}?org=${
                  searchParams.get("org") || "lemoncode"
                }`}
              >
                {member.login}
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay miembros */}
      {!isLoading && !error && members.length === 0 && (
        <div>
          No se encontraron miembros para la organización "
          {searchParams.get("org") || "lemoncode"}"
        </div>
      )}
    </>
  );
};
