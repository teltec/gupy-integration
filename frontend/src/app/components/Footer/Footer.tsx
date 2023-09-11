'use client'

import { Footer as Foot } from "flowbite-react";

export const Footer = () => {
  return (
    <div className="mt-auto">
      <Foot container={true}>
        <Foot.Copyright
          href="https://teltecsolutions.com.br/"
          by="Teltec Solutions"
          year={2023}
        />
        <Foot.LinkGroup>
          <Foot.Link href="https://teltecsolutions.com.br/quem-somos">
            Quem somos
          </Foot.Link>
          <Foot.Link href="https://teltecsolutions.com.br/politica-de-privacidade">
            Políticas de privacidade
          </Foot.Link>
          <Foot.Link href="https://teltecsolutions.com.br/contato">
            Contato
          </Foot.Link>
          <Foot.Link href="https://teltecsolutions.com.br/suporte">
            Suporte
          </Foot.Link>
        </Foot.LinkGroup>
      </Foot>
    </div>
  );
};
