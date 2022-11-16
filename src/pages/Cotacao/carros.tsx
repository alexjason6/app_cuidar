import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './style';

export default function assistenciaCarros() {
  return (
    <ScrollView style={styles.containerRegulamentos}>
      <Text style={styles.titleRegulamento}>
        REGULAMENTO benefício ASSISTÊNCIA CARROS STANDARD
      </Text>
      <View style={{height: 30}} />
      <Text style={styles.titleRegulamento}>ACIDENTE / SINISTRO</Text>
      <Text style={styles.conteudoRegulamento}>
        Colisão, abalroamento ou capotagem envolvendo direta ou indiretamente o
        veículo e que impeça o mesmo de se locomover por seus próprios meios.
      </Text>
      <Text style={styles.titleRegulamento}>COBERTURA</Text>
      <Text style={styles.conteudoRegulamento}>
        Os serviços abaixo descritos terão cobertura em território nacional.
      </Text>
      <Text style={styles.titleRegulamento}>MUNICÍPIO DE DOMICÍLIO</Text>
      <Text style={styles.conteudoRegulamento}>
        Município de endereço do Cliente constante na proposta seja este
        residencial ou comercial, ou o município de onde o Cliente partiu com o
        veículo. Será sempre considerado como município de partida o ponto de
        origem da última viagem iniciada pelo Cliente.
      </Text>
      <Text style={styles.titleRegulamento}>PANE</Text>
      <Text style={styles.conteudoRegulamento}>
        Defeito de origem mecânica ou elétrica, que impeça a locomoção do
        veículo por seus próprios meios.
      </Text>
      <Text style={styles.titleRegulamento}>CLIENTE</Text>
      <Text style={styles.conteudoRegulamento}>
        Todo condutor do veículo coberto por este serviço, assim como toda
        pessoa transportada a título gratuito, pelo veículo, nos limites legais
        de capacidade do mesmo, na hora da ocorrência da pane/acidente.
      </Text>
      <Text style={styles.titleRegulamento}>VEÍCULO</Text>
      <Text style={styles.conteudoRegulamento}>
        Todo meio de transporte terrestre automotor de passeio ou comercial
        leve, com peso líquido inferior a 3,5 toneladas, excluído os destinados
        ao transporte público de mercadorias ou passageiros ou de aluguel.
      </Text>
      <View style={{height: 30}} />
      <Text style={styles.titleRegulamento}>
        SERVIÇOS SEM FRANQUIA QUILOMÉTRICA
      </Text>
      <View style={{height: 30}} />
      <Text style={styles.titleRegulamento}>SOS ELÉTRICO / MECÂNICO</Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de acidente, roubo, pane ou incêndio, a Assistência 24 horas
        providenciará o envio de um mecânico para conserto de emergência no
        local, se tecnicamente possível, até um raio de 100 (cem) quilômetros.
        As despesas com a reposição de peças necessárias para o conserto
        correrão por conta do Cliente, responsabilizando-se a Assistência 24
        horas somente pelo custo da mão-de-obra e deslocamento do socorro
        mecânico. Este serviço garante apenas um reparo provisório, sendo que
        caberá ao Cliente conduzir o veículo imediatamente a uma oficina de sua
        escolha para definitivo reparo, ficando os serviços de oficina, como
        reposição de peças, sob sua responsabilidade. Limite: 01 (uma)
        utilização/mês.
      </Text>
      <Text style={styles.titleRegulamento}>REBOQUE APÓS PANE</Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de pane e não sendo possível o conserto no local, o veículo será
        rebocado até a oficina referenciada mais próxima, limitado a
        quilometragem contratada e descrita a seguir. Plano Standard: Limitado
        ao raio máximo de 150 (cento e cinquenta quilômetros). Limite: 01 (uma)
        utilização/mês.
      </Text>
      <Text style={styles.titleRegulamento}>REBOQUE APÓS SINISTRO</Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de sinistro e não sendo possível o conserto no local, o veículo
        será rebocado até a oficina referenciada mais próxima, limitado à
        quilometragem contratada e descrita a seguir. Plano Standard: Limitado
        ao raio máximo de 200 (duzentos quilômetros).
      </Text>
      <Text style={styles.titleRegulamento}>TROCA DE PNEUS</Text>
      <Text style={styles.conteudoRegulamento}>
        Para os casos de problemas com pneus furados ou quebra da roda, será
        enviado um prestador de serviços para efetuar a substituição do mesmo
        pelo estepe do veículo, ou ainda, para efetuar a remoção do veículo até
        a oficina mais próxima, em um raio máximo de 100 (cem) km. OBS.: O custo
        com reparo ou aquisição de pneus e rodas será por conta do Cliente.
        Limite: 1 (uma) utilização/mês.
      </Text>
      <Text style={styles.titleRegulamento}>SERVIÇO DE CHAVEIRO</Text>
      <Text style={styles.conteudoRegulamento}>
        Providenciaremos um chaveiro em casos de perda ou quebra da chave,
        tentativa de roubo ou chaves trancadas no interior do veículo. A
        assistência será responsável pela mão de obra deste profissional. O
        custo do conserto da fechadura danificada e confecção da chave será de
        responsabilidade do Cliente. OBS.: Este serviço refere-se ao padrão de
        chave clássico (sem codificação, etc.), nos outros casos, mandaremos um
        reboque automaticamente, respeitando o raio máximo de 100 (cem) km.
        Limite: 1 (uma) utilização/mês.
      </Text>
      <Text style={styles.titleRegulamento}>TáXI</Text>
      <Text style={styles.conteudoRegulamento}>
        Caso tenha sido fornecido pela Assistência 24 horas o serviço de Reboque
        do veículo assistido, após evento coberto em um raio de até 50
        (cinquenta) quilômetros do endereço de domicilio do Cliente, será
        disponibilizado um taxi para retorno dos ocupantes do veículo ao
        endereço de residência. Limitado a um único destino.
      </Text>
      <View style={{height: 30}} />
      <Text style={styles.titleRegulamento}>
        SERVIÇOS PRESTADOS A MAIS DE 50 KM DOS LIMITES DO MUNICÍPIO DE DOMICÍLIO
        DO CLIENTE
      </Text>
      <View style={{height: 30}} />
      <Text style={styles.titleRegulamento}>
        MEIO DE TRANSPORTE ALTERNATIVO
      </Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de pane, acidente, roubo ou incêndio, colocaremos a disposição
        do Cliente e de seus acompanhantes (levando-se em conta a capacidade
        legal do veículo, até 5 (cinco) pessoas), o meio de transporte mais
        adequado para o retorno ao seu domicílio ou continuação da viagem.
        Considera-se meio de transporte adequado aquele que a equipe julgar mais
        viável, levando em consideração a disponibilidade de acionamento de
        prestador, tempo e custo. Para continuação da viagem, a distância tem
        que ser equivalente a de retorno ao seu município de domicílio. Limite:
        1 (uma) utilização/mês.
      </Text>
      <Text style={styles.titleRegulamento}>HOSPEDAGEM</Text>
      <Text style={styles.conteudoRegulamento}>
        Não sendo possível providenciar o transporte alternativo em virtude de
        falhas na estrutura local, ou pelo horário da ocorrência,
        providenciaremos para o Cliente e para até 04 acompanhantes, hospedagem
        (diárias) em hotel, limitando-se as despesas ao máximo de 02 (duas)
        diárias, sendo o limite de até R$ 80,00 para cada diária. Limites: Plano
        Standard: 2 (duas) diárias e/ou R$ 80,00 por dia e por pessoa.
      </Text>
      <Text style={styles.titleRegulamento}>
        TRANSPORTE PARA RETIRADA DO VEÍCULO
      </Text>
      <Text style={styles.conteudoRegulamento}>
        Após a reparação do veículo ou localização após roubo, colocaremos à
        disposição o meio de transporte mais adequado para que o Cliente ou uma
        pessoa por ele indicada possa recuperá-lo. Considera-se meio de
        transporte adequado aquele que a equipe julgar mais viável, levando em
        consideração a disponibilidade de acionamento de prestador, tempo e
        custo. Limite de gasto máximo equivalente à passagem aérea de linha
        regular, na classe econômica.
      </Text>
      <Text style={styles.titleRegulamento}>
        REMOÇÃO HOSPITALAR APÓS ACIDENTE
      </Text>
      <Text style={styles.conteudoRegulamento}>
        Após prestados os primeiros socorros e estando o cliente em algum
        estabelecimento de saúde que não tenha profissionais capacitados ou/e
        sem aparelhagem apropriada para tratar as lesões provenientes do
        acidente em questão , a Assistência arcará e se encarregará de
        providenciar seu transporte para o hospital mais próximo deste
        estabelecimento, que tenha estas condições. A necessidade da remoção
        será determinada pelo médico local e a equipe da Assistência. A
        determinação será baseada exclusivamente por motivos médicos e não por
        motivos sociais como o fato de o cliente ou sua família, desejarem
        voltar a sua cidade de residência. O serviço é oferecido em todo
        território nacional, mas só poderá ser feito após a obtenção de vaga no
        hospital receptor com o nome deste e do médico ou responsável que a
        cedeu. Isto cabe à família ou ao hospital emissor e não à Assistência.
        Antes da liberação do serviço, em todos os casos, os médicos da
        Assistência farão contato telefônico com médico responsável pelo
        paciente no local para determinar o tipo de transporte necessário e
        apropriado, ou seja, um meio que possua aparelhagem e pessoal
        tecnicamente qualificado para oferecer assistência para o paciente,
        naquele momento especifico. Isto pode ocorrer em: ambulância UTI,
        ambulância comum, UTI área, etc. Se a família ou o cliente decidirem
        usar qualquer outro meio alternativo para o transporte à revelia da
        decisão tomada pela equipe médica da Assistência, esta não se
        responsabilizará por custos ou conseqüências. REGULAMENTO DE ASSISTÊNCIA
        24H O limite financeiro é de até R$ 1.800,00 (um mil e oitocentos
        reais). {'\n'}
        {'\n'}Para cada caso são feitas cotações com prestadores especializados
        e disponíveis. Caso o custo do meio de transporte considerado adequado
        para o caso seja superior ao limite imposto, o cliente e/ou familiares
        devem arcar com os custos integralmente e posteriormente solicitar o
        reembolso do valor a que têm direito.
      </Text>
      <Text style={styles.titleRegulamento}>MOTORISTA SUBSTITUTO</Text>
      <Text style={styles.conteudoRegulamento}>
        Caso o Cliente seja hospitalizado em virtude de acidente ou incêndio do
        veículo, e não havendo quem possa dirigir o carro, a Assistência 24
        horas colocará à disposição um motorista para conduzir o veículo e seus
        acompanhantes de volta ao domicílio do Cliente.
      </Text>
      <Text style={styles.titleRegulamento}>TRANSLADO DE CORPO</Text>
      <Text style={styles.conteudoRegulamento}>
        Após acidente com o veículo e, caso o Cliente permaneça hospitalizado
        por um período superior a 10 (dez) dias, a Assistência 24 horas garante
        o meio de transporte mais adequado para que uma pessoa da família ou
        alguém por ele indicada para tal, residente no país, possa visitá-lo.
        Esta pessoa terá direito a uma passagem aérea de ida e volta, na classe
        econômica.
      </Text>
      <Text style={styles.titleRegulamento}>RETORNO A DOMICÍLIO</Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de falecimento de parente de primeiro grau, enquanto o carro
        segurado estiver em reparos fora do município de residência, a
        Assistência 24 horas fornecerá um meio de transporte para uma pessoa
        retornar para a residência.
      </Text>
      <Text style={styles.titleRegulamento}>GUARDA DO VEÍCULO</Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de pane ou sinistro com o veículo, ocorrido a uma distância
        igual ou superior a 50 (cinqüenta) km do município do domicílio do
        Cliente, será garantido pela Assistência 24 horas o estacionamento em
        local por esta indicado e guarda exclusiva do veículo para aguardar
        reparação ou sua retirada após conserto, limitado a R$100,00 (cem reais)
        por ocorrência.
      </Text>
      <Text style={styles.titleRegulamento}>
        TRANSMISSÃO DE MENSAGENS URGENTES
      </Text>
      <Text style={styles.conteudoRegulamento}>
        Em caso de acidente, a Assistência 24 horas poderá, a pedido do Cliente,
        avisar seus parentes, sua empresa ou médico particular sobre o seu
        estado de saúde e localização, procurando transmitir segurança e
        tranqüilidade, bem como tomar todas as providências necessárias,
        contatar seu convênio de saúde e direcionar todos os esforços para a
        pronta resolução dos problemas. A Assistência 24 horas, além das
        hipóteses já mencionadas nestas Condições Gerais, não fornecerá os
        serviços e Assistência nas seguintes condições: {'\n'}• Serviços
        providenciados pelo próprio Cliente, sem autorização prévia da
        Assistência 24 horas; {'\n'}• Mão de obra para a reparação do veículo
        dentro da oficina ou concessionária; • Substituição de peças defeituosas
        do veículo; • Fornecimento de qualquer tipo de material destinado à
        reparação do veículo; {'\n'}• Serviços de Assistência para terceiros;{' '}
        {'\n'}• Serviços de Assistência para veículos que estiver participando
        em competições, gincanas, apostas e provas de velocidade; {'\n'}•
        Serviços de Assistência para veículos em trânsito por estradas, trilhas
        ou caminhos impedidos, não abertos ao tráfego urbano, ou de areias fofas
        ou movediças; {'\n'}• Atendimento para panes repetitivas que
        caracterizem falta de manutenção do veículo; • Veículos carregados (com
        carga); {'\n'}• Serviços especiais tais como: guindaste, munck, etc.
      </Text>
      <View style={{height: 250}} />
    </ScrollView>
  );
}
