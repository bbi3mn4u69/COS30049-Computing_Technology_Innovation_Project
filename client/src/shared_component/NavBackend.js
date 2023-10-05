function NavBackend() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <div>
        {isDesktop ? (
          <div className="desktop-component"></div>
        ) : (
          <div className="mobile-component">Mobile Component</div>
        )}
      </div>
    );
  }
  
  export default NavBackend;