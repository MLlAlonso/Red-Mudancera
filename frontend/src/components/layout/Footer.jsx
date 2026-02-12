export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">

        <div className="footer__top">
          <h2 className="footer__title">MudanzaFácil <span>®</span></h2>
          <p className="footer__description">
            Plataforma de colaboración para empresas de mudanzas en México
          </p>

          <div className="footer__links">
            <a href="https://mudanzafacil.com.mx/reglas-de-uso-comunidad/" target="_blank">Términos y Condiciones</a>
            <span>|</span>
            <a href="https://mudanzafacil.com.mx/reglas-de-uso-comunidad/" target="_blank">Aviso de Privacidad</a>
            <span>|</span>
            <a href="https://mudanzafacil.com.mx/reglas-de-uso-comunidad/" target="_blank">Reglas de la comunidad</a>
            <span>|</span>
            <a href="https://mudanzafacil.com.mx/reglas-de-uso-comunidad/" target="_blank">Soporte</a>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          © 2026 MudanzaFácil. Todos los derechos reservados
        </div>

      </div>
    </footer>
  );
}
