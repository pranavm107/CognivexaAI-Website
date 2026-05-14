import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUIStore from '../store/uiStore';

const useShortcuts = () => {
  const navigate = useNavigate();
  const { setCommandMenuOpen } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if focus is in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      // Command Menu: ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen(true);
      }

      // Search: /
      if (e.key === '/') {
        e.preventDefault();
        setCommandMenuOpen(true);
      }

      // Quick Navigation: G + ...
      if (e.key === 'g') {
        const handleNav = (navEvent) => {
          if (navEvent.key === 'd') navigate('/admin/dashboard');
          if (navEvent.key === 'b') navigate('/admin/bookings');
          if (navEvent.key === 'i') navigate('/admin/inquiries');
          if (navEvent.key === 's') navigate('/admin/settings');
          window.removeEventListener('keydown', handleNav);
        };
        window.addEventListener('keydown', handleNav);
        // Timeout to prevent stuck listener
        setTimeout(() => window.removeEventListener('keydown', handleNav), 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, setCommandMenuOpen]);
};

export default useShortcuts;
