interface StatePanelProps {
  title: string;
  description: string;
  variant: "loading" | "error" | "empty";
  actionLabel?: string;
  onAction?: () => void;
}

export function StatePanel({ title, description, variant, actionLabel, onAction }: StatePanelProps) {
  return (
    <div className={`state-panel ${variant}`}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {actionLabel && onAction ? (
        <button type="button" className="action-button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
