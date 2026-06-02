import { useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { createElement } from 'react';

export default function Icon({ name, size = 22, stroke = 2, className, style }) {
  // Convert kebab-case name to PascalCase for lucide-react
  const pascalName = name
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const LucideIcon = LucideIcons[pascalName];
  if (!LucideIcon) return null;
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', lineHeight: 0, ...style }}
    >
      <LucideIcon size={size} strokeWidth={stroke} />
    </span>
  );
}
