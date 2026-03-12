interface HeaderProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  exchangeName: string;
}

export function Header({ title, subtitle, lastUpdated, exchangeName }: HeaderProps) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Finansdashboard</p>
        <h1>{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div className="header-meta">
        <div className="meta-pill">
          <span>Børs</span>
          <strong>{exchangeName}</strong>
        </div>
        <div className="meta-pill">
          <span>Sist oppdatert</span>
          <strong>{lastUpdated}</strong>
        </div>
      </div>
    </header>
  );
}
