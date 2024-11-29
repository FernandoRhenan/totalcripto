import useSWR from "swr";

async function statusFetch(path) {
  const response = await fetch(path);
  const jsonResponse = await response.json();
  return jsonResponse;
}

function StatusPage() {
  return (
    <div>
      <Status />
    </div>
  );
}

function Status() {
  const { data, isLoading } = useSWR("/api/v1/status", statusFetch, {
    refreshInterval: 2000,
  });

  if (data && !isLoading) {
    return (
      <div>
        <h1>Status</h1>
        <span>
          Atualizado em: {new Date(data.updated_at).toLocaleString("pt-BR")}
        </span>
        <div>
          <h1>Banco de dados</h1>
          <br />
          <span>Versão: {data.services.database.version}</span>
          <br />
          <span>
            Conexões abertas: {data.services.database.open_connections}
          </span>
          <br />
          <span>
            Limit de conexões: {data.services.database.max_connections}
          </span>
        </div>
      </div>
    );
  } else {
    return <div>Carregando...</div>;
  }
}

export default StatusPage;
