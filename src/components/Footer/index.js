import React from 'react';

// import { Container } from './styles';

const Footer = ({date}) => {
  return(
    <footer class="py-3 bg-dark text-white-50 fixed-bottom">
      <div class="container text-center">
        <small>Todos os direitos reservados - {date} &copy; AARCA - Associação de Amigos e Remadores da Canoa Caiçara. </small>
      </div>
    </footer>
  )
};

export default Footer;
