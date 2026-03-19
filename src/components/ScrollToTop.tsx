import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToHashTarget = () => {
        const element = document.getElementById(targetId);
        if (!element) return false;
        element.scrollIntoView({ behavior: "auto", block: "start" });
        return true;
      };

      if (!scrollToHashTarget()) {
        requestAnimationFrame(() => {
          if (!scrollToHashTarget()) {
            setTimeout(scrollToHashTarget, 80);
          }
        });
      }
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
