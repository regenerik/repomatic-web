import React, { useContext, useState } from 'react';
import { Context } from '../js/store/appContext';
import './ReportList.css';
import gifLoading from "../img/loading_4.gif"; // O el gif que prefieras

// Componente para cada tarjeta de reporte (acordeón)
const ReportCard = ({ report, loadingDownloadIds, handlerDownloadVersion }) => {
  const [expanded, setExpanded] = useState(false);

  // Función para convertir "dd/mm/yyyy hh:mm:ss" a objeto Date
  const parseDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  // Ordenamos las versiones de más nuevo a más viejo
  const sortedVersions = [...report.versions].sort((a, b) => {
    return parseDate(b.created_at) - parseDate(a.created_at);
  });

  // Si no está expandido, mostramos solo las primeras 3 versiones
  const visibleVersions = expanded ? sortedVersions : sortedVersions.slice(0, 3);
  // Si hay más de 3 versiones, habilitamos el botón de toggle
  const hasMoreVersions = sortedVersions.length > 3;

  // Tomamos el título del primer elemento (asumimos que todas son iguales)
  const reportTitle =
    sortedVersions.length > 0
      ? sortedVersions[0].title.replace(/\+/g, ' ')
      : 'Sin Título';

  return (
    <div className="report-card">
      <div className="report-card-header">
        <h5 className="report-title">{reportTitle}</h5>
        <small className="report-url">{report.report_url.split('?')[1]}</small>
      </div>
      <div className="report-card-body">
        <ul className="version-list">
          {visibleVersions.map((version) => (
            <li key={version.id} className="version-item">
              <span className="version-date">{version.created_at}</span>
              <button
                className="download-button"
                onClick={() => handlerDownloadVersion(version.id)}
                disabled={loadingDownloadIds.includes(version.id)}
              >
                {loadingDownloadIds.includes(version.id) ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa fa-download"></i>
                )}
              </button>
            </li>
          ))}
        </ul>
        {hasMoreVersions && (
          <div
            className="toggle-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <span>
                Mostrar menos <i className="fa fa-chevron-up"></i>
              </span>
            ) : (
              <span>
                Mostrar más <i className="fa fa-chevron-down"></i>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ReportList = () => {
  const { store, actions } = useContext(Context);
  const [loadingDownloadIds, setLoadingDownloadIds] = useState([]);

  const handlerDownloadVersion = async (versionId) => {
    // Evitamos múltiples clicks
    if (loadingDownloadIds.includes(versionId)) return;

    setLoadingDownloadIds((prev) => [...prev, versionId]);

    try {
      await actions.downloadReport(versionId);
    } catch (error) {
      console.error("Error al descargar la versión del reporte:", error);
    } finally {
      setLoadingDownloadIds((prev) => prev.filter((id) => id !== versionId));
    }
  };

  if (!store.reportes_acumulados) {
    return (
      <div className="loading-container">
        <img
          src={gifLoading}
          alt="Cargando, por favor espere..."
          className="loading-gif"
        />
      </div>
    );
  }

  return (
    <div className="report-list-container">
      <button className="refresh-button" onClick={actions.getReportList}>
        Cargar/Actualizar
      </button>
      <h3 className="report-list-title">Reportes Acumulados</h3>
      {store.reportes_acumulados.length === 0 ? (
        <p>No hay reportes disponibles.</p>
      ) : (
        store.reportes_acumulados.map((report, reportIndex) => (
          <ReportCard
            key={reportIndex}
            report={report}
            loadingDownloadIds={loadingDownloadIds}
            handlerDownloadVersion={handlerDownloadVersion}
          />
        ))
      )}
    </div>
  );
};

export default ReportList;
