import { clsx } from 'clsx';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={clsx(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            active === cat
              ? 'bg-accent text-white shadow-lg shadow-accent/25'
              : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-hover border border-border'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
