/**
 *
 * Button (Enhanced UI/UX Edition)
 *
 */

import React from 'react';
import Tooltip from '../Tooltip';
import Popover from '../Popover';

const variants = {
  primary: 'custom-btn-primary unique-ux-ripple',
  secondary: 'custom-btn-secondary unique-ux-ripple',
  danger: 'custom-btn-danger unique-ux-ripple',
  link: 'custom-btn-link',
  dark: 'custom-btn-dark unique-ux-ripple',
  none: 'custom-btn-none',
  empty: ''
};

const Button = props => {
  const {
    id,
    size,
    variant,
    tabIndex,
    ariaLabel,
    ariaExpanded,
    type,
    disabled,
    loading, // UX Addition: Handles asynchronous form actions smoothly
    className,
    text,
    role,
    icon,
    iconDirection,
    iconClassName,
    borderless,
    round,
    onClick,
    tooltip,
    tooltipContent,
    popover,
    popoverContent,
    popoverTitle
  } = props;

  const v = variant ? variants[variant] : '';
  const btnVariant = v;

  const btn = icon && text ? 'with-icon' : icon && !text ? 'icon-only' : 'text-only';

  // Included 'is-loading' class modifier dynamically for styling transitions
  const classNames = `input-btn${className ? ` ${className}` : ''}${
    btnVariant ? ` ${btnVariant}` : ''
  } ${size} ${btn} ${
    iconDirection === 'left' ? 'icon-left' : 'icon-right'
  } ${borderless ? 'border-0' : ''} ${loading ? 'is-loading' : ''}`;

  const iconClassNames = `btn-icon${iconClassName ? ` ${iconClassName}` : ''}`;

  const tooltipId = tooltip ? `tooltip-${id}` : id;
  const popoverId = popover ? `popover-${id}` : id;
  const btnId = tooltip ? tooltipId : popoverId;

  // Modern UI UX Click Effect
  const handleRippleEffect = (e) => {
    if (disabled || loading) return;
    
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ux-ripple-wave');

    const prevRipple = button.getElementsByClassName('ux-ripple-wave')[0];
    if (prevRipple) prevRipple.remove();

    button.appendChild(circle);
    
    if (onClick) onClick(e);
  };

  return (
    <button
      id={btnId}
      tabIndex={tabIndex}
      aria-label={loading ? "Loading process active" : ariaLabel}
      aria-expanded={ariaExpanded}
      role={role}
      disabled={disabled || loading}
      className={classNames}
      type={type}
      onClick={handleRippleEffect}
      style={{
        borderRadius: typeof round === 'number' ? `${round}px` : round,
        position: 'relative',
        overflow: 'hidden' // Keeps the slick element micro-reflections enclosed
      }}
    >
      {tooltip && <Tooltip target={tooltipId}>{tooltipContent}</Tooltip>}
      {popover && (
        <Popover target={popoverId} popoverTitle={popoverTitle}>
          {popoverContent}
        </Popover>
      )}

      {loading ? (
        <div className="ux-button-spinner-container">
          <span className="ux-button-spinner" />
          {text && <span className='btn-text processing-text'>Please wait...</span>}
        </div>
      ) : (
        <>
          {iconDirection === 'left' ? (
            <>
              {icon && <div className={iconClassNames}>{icon}</div>}
              {text && <span className='btn-text'>{text}</span>}
            </>
          ) : (
            <>
              {text && <span className='btn-text'>{text}</span>}
              {icon && <div className={iconClassNames}>{icon}</div>}
            </>
          )}
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  variant: 'secondary',
  size: 'md',
  className: '',
  iconDirection: 'left',
  iconClassName: '',
  borderless: false,
  round: 4,
  tooltip: false,
  popover: false,
  loading: false
};

export default Button;