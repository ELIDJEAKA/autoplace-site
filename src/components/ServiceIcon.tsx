import { Icon, type IconName } from './Icon';

const svgProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="si-wheel">
      <circle cx={cx} cy={cy} r={2} />
      <path d={`M${cx} ${cy - 1.1}v2.2`} />
    </g>
  );
}

/**
 * Icône de service animée au survol de la carte parente (`.card--lift`) : roue qui tourne, clé qui
 * pivote, coche du bouclier tracée, dépanneuse qui avance, clé à molette qui oscille. Décorative.
 */
export function ServiceIcon({ name }: { name: IconName }) {
  switch (name) {
    case 'car':
      return (
        <svg {...svgProps} className="si si--car">
          <path className="si-body" d="M5 17h14M3 17v-4l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5v4a1 1 0 0 1-1 1h-1M3 17a1 1 0 0 0 1 1h1M3 13h18" />
          <Wheel cx={7.5} cy={18.5} />
          <Wheel cx={16.5} cy={18.5} />
        </svg>
      );
    case 'key':
      return (
        <svg {...svgProps} className="si si--key">
          <g className="si-turn">
            <path d="M15 7a4 4 0 1 1-3.9 4.9L4 19v2h3v-2h2v-2h2l1.1-1.1A4 4 0 0 1 15 7zM16 10h.01" />
          </g>
        </svg>
      );
    case 'gear':
      return (
        <svg {...svgProps} className="si si--gear">
          <g className="si-spin">
            <Icon name="gear" />
          </g>
        </svg>
      );
    case 'shield':
      return (
        <svg {...svgProps} className="si si--shield">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path className="si-draw" pathLength={1} d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...svgProps} className="si si--truck">
          <g className="si-drive">
            <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" />
            <Wheel cx={6.5} cy={17.5} />
            <Wheel cx={17.5} cy={17.5} />
          </g>
        </svg>
      );
    case 'wrench':
      return (
        <svg {...svgProps} className="si si--wrench">
          <g className="si-wiggle">
            <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a2.8 2.8 0 0 1-4-4l8-8-1.3-1.3a4 4 0 0 0-5-5l2.6 2.6-1 2.4-2.4 1L7.3 6.1" />
          </g>
        </svg>
      );
    case 'file':
      return (
        <svg {...svgProps} className="si si--file">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />
          <path className="si-draw" pathLength={1} d="M8 13h8" />
          <path className="si-draw si-draw--late" pathLength={1} d="M8 17h5" />
        </svg>
      );
    default:
      return <Icon name={name} className="si si--pop" />;
  }
}
