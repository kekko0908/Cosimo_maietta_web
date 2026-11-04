import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { portfolioCollections } from './collections';

export function CollectionNavigation() {
  const location = useLocation();
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navigation.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav && active)
      nav.scrollLeft =
        active.offsetLeft - nav.offsetLeft - nav.clientWidth / 2 + active.offsetWidth / 2;
  }, [location.pathname]);
  return (
    <nav ref={navigation} className="v2-collection-navigation" aria-label="Percorsi fotografici">
      {portfolioCollections.map((collection) => (
        <Link
          key={collection.slug}
          to={collection.path}
          aria-current={location.pathname === collection.path ? 'page' : undefined}
        >
          <span>{collection.index}</span>
          {collection.label}
        </Link>
      ))}
    </nav>
  );
}
