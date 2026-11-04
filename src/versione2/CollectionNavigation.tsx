import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { portfolioCollections } from "./collections";

export function CollectionNavigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const current = portfolioCollections.find(
    (collection) => collection.path === location.pathname,
  );
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <div
      className={`ed-collection-index ${open ? "is-open" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        className="ed-index-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="collection-index"
        onClick={() => setOpen((value) => !value)}
      >
        <span>Indice fotografico</span>
        <span className="ed-index-current">
          <b>{current?.index}</b>
          {current?.label}
        </span>
        <Plus aria-hidden="true" />
      </button>
      <nav
        id="collection-index"
        className="ed-index-grid"
        aria-label="Percorsi fotografici"
        hidden={!open}
      >
        {portfolioCollections.map((collection) => (
          <Link
            key={collection.slug}
            to={collection.path}
            aria-current={
              current?.slug === collection.slug ? "page" : undefined
            }
          >
            <span className="ed-index-number">{collection.index}</span>
            <span>{collection.label}</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
