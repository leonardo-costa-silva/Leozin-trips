# Verificação — LEOZIN TRIPS
Atualização: 13/11/2026. Comando: node tests.cjs. Suíte completa aprovada após a ampliação mundial e o planejador.

## Escopo automatizado
- Entrada: sete links de continente, arquivos locais, ausência de busca, imagem e acesso a montar-viagem.html.
- Europa: 15 grupos de verificações anteriores, incluindo ordenação dos 51 países, bandeiras, moeda/idioma, filtros, voos inline, referências, estados vazios e dados inválidos.
- Sete continentes: 197 países únicos e 204 cartões regionais, moedas, idiomas, cotações, filtro de voos, filtro monetário, interseção e retorno à lista.
- Câmbio: provedor principal, alternativo, referência local, rejeição de valores inválidos e preservação da referência mais recente. Rede simulada.
- global-features-tests.cjs carrega os scripts na ordem real dos sete HTMLs: mesmo conjunto de ícones das estações, link do planejador, Voos nos 204 cartões e Trens somente nos 68 cartões com ligações cadastradas. Abre os painéis de todos os países e os painéis ferroviários aplicáveis. Confere origens, destinos, tempos/fonte e dados ausentes.
- Trens: 26 ligações europeias, 23 complementos internacionais e oito avisos especiais separados. Não inferir ligação por transitividade, não tratar troca/ônibus como trem direto, não atribuir aeroportos ou estações de país vizinho. Países como Brasil, Austrália, Nova Zelândia, Costa Rica, Japão, Vaticano e Portugal não recebem botão por ligações ausentes ou substituição por ônibus nesta base.
- Grade europeia: 51/52 sentidos das 26 ligações possuem algum registro; datas dentro do respectivo período, horários válidos, empresas, ida/volta distintas, cobertura parcial de Mônaco e lacuna de Belgrado–Bar explícitas. Shuttle Tebrau: 18/13 partidas por sentido, 5 minutos, sete datas de grade-base. TAZARA: partida de referência das terças às 14:00 CAT preservada.
- Voos por país: 9.688 pares internacionais com aeroportos, tempos positivos, referência e fonte; sem duplicação de pares; destinos de Portugal incluindo LIS–GRU; origem correta; funcionamento com filtros ativos; avisos de cobertura e operação não verificada.
- Temporadas: 612 quadradinhos europeus e cobertura mensal para todos os 204 cartões regionais; 12 meses, três botões, filtros de categoria, mudança/desativação, interseção com voos. Perfis de 197 países têm 12 posições válidas; sem classe season-undefined. Dez países têm classificação não definida, preservada.

## Sua viagem
trip-tests.cjs aprovado:
- Datas vazias, abrir calendário, dois meses, ida/volta, Aplicar e fechar, cancelar sem alterar datas aplicadas.
- Campos preenchidos automaticamente e dias/noites incluindo ida e volta.
- Mesmo dia, virada de mês/ano, ano bissexto, regras de 1900/2000, datas de anos inferiores a 100 e período que atravessa mudança de horário de verão. Cálculo civil em UTC.
- Rejeição de data inexistente, formato inválido e volta anterior à ida; calendário permanece aberto no erro.
- 197 países sem duplicação, filtro de continente, seleção/desmarcação, indicação Selecionado, remoção no resumo, limpar seleção e concluir.
- Temporada por país, divisão por mês e quantidade de dias, combinação de temporadas e classificação desconhecida.
- Restauração do planejamento salvo; armazenamento bloqueado ou corrompido; rejeição de países inválidos e duplicados.
- Limites do calendário para os anos suportados e existência dos arquivos locais referenciados.

## Limites
Os testes de interface usam DOM simulado: não verificam geometria, aparência, foco real, teclado com leitor de tela nem interação nativa dos diálogos. Inspeção visual e teste ponta a ponta em navegador não foram realizados. Uma tentativa anterior de prévia file:// foi bloqueada pela política da ferramenta; não foi contornada. Nenhuma publicação no GitHub Pages foi feita.

As fontes públicas de países, bandeiras, câmbio, aeroportos e rotas foram efetivamente baixadas. O teste não confirma individualmente a operação atual de cada voo/trem ou a disponibilidade de páginas externas. Voos por país são estatísticas históricas com duração calculada, não malha atual confirmada. Perfis de temporada são estimativas editoriais amplas, não medição de demanda.

## Revisão manual sugerida
Abra index.html e cada continente em 360, 768 e 1440 px. Confira a faixa de estações, filtros e botões de transporte. Entre em Montar viagem; escolha datas, aplique, marque países de continentes diferentes e confira temporadas. Cruze dois meses e o fim do ano; cancele uma edição e recarregue para verificar persistência quando o navegador permitir. Verifique navegação por teclado, Escape e retorno do foco. Desconecte a internet para conferir a referência cambial salva.

Atualização do planejador: seção separada de temporada removida. Temporada integrada ao país selecionado, com cor e legenda abaixo do nome. Testados baixa/média/alta, mudança de datas, maior número de dias, desempate pela temporada mais alta, ausência de datas e classificação desconhecida. Cores também aplicadas aos países marcados no seletor.


## Planejar — rotas alternativas
route-planner-tests.cjs aprovado, com dados reais locais e uma rede sintética de controle:
- Rejeitar data inválida/volta anterior, datas não aplicadas e seleção vazia.
- Três alternativas distintas para França/Bélgica/Países Baixos/Alemanha; destinos selecionados exatamente uma vez como estadia; início por país com voo direto de GRU quando há candidato adequado.
- França como única chegada direta selecionada para Albânia/Áustria/França; preferência preservada em todas as opções.
- Semana de referência: Bélgica em 24/11/2026 sem partida indicada não recebe chegada direta; 25/11 aparece na referência. Fora da semana, status não verificado.
- Chegadas com conexão e países de trânsito identificados; trechos independentes sem inventar ligação direta por transitividade. Rede de controle com dois ramos ligada por hub utiliza conexão publicada.
- Ônibus substituto excluído da rede ferroviária direta; lacunas explícitas para Andorra/Vaticano; apenas uma opção quando não há alternativas distintas.
- Portugal com aeroportos de entrada diferentes; Brasil como ponto de partida quando selecionado.
- Aeroporto idêntico sem transfer; aeroporto/estação da mesma cidade com transfer local; cidades diferentes com deslocamento interno a organizar. Custo da última ligação considera a volta.
- Voos estatísticos mantêm duração estimada, fonte, período e status histórico; trens mantêm operadora/fonte. A volta não é inventada por inversão dos dias/tempos do voo de ida.
- Interface: botão Planejar, erros objetivos, resultado abaixo, recomendação de entrada, alternativas com fontes, alerta de período curto, invalidação ao editar datas/países, restauração do botão após cálculo.
- Seleção dos 197 países processada com todos os países distintos na ordem de estadias; cerca de 5 segundos no ambiente de teste, sem garantia de tempo em outros dispositivos.

Os resultados continuam sendo sugestões com cobertura parcial, sem disponibilidade na data ou compatibilidade de horários confirmadas. DOM simulado; inspeção visual em navegador permanece pendente.


## Ampliação de entradas e comparação de trens
Aprovados os testes atualizados de rotas e interface:
- França/Albânia/Áustria mantém opções diretas pela França e acrescenta opções de iniciar por Albânia ou Áustria com conexão.
- Conexões por país classificadas por trocas de aeroporto/cidade e custo de referência; fontes dos dois trechos preservadas.
- Rede sintética mantém as opções por chegada direta e acrescenta entradas indiretas pelos outros países, sem criar uma ligação ferroviária direta inexistente.
- Trens diretos França–Itália e alternativas com troca França–Alemanha; ausência de trem adequado Andorra–Vaticano; operadoras, cidades e fontes presentes.
- Interface mostra Entradas com conexão, países de destino, tipos de transferência, alternativas adicionais, primeiro destino por opção e Também compare os trens com Eurostar/cidades.
- Editar datas/países limpa também a comparação anterior de conexões.
- O teste de 197 países continua completo; o tempo observado aumentou para cerca de 7 segundos neste ambiente. Não é uma promessa de desempenho em outros dispositivos.

DOM simulado; não houve nova inspeção visual em navegador. Nenhuma fonte passou a representar consulta de disponibilidade na data escolhida.

## Seleção, cidades, destinos e tarifas — 15/11/2026
Verificações adicionais em destinations-tests.cjs:
- Bloquear seleção de países sem datas aplicadas; validação inclusive por chamada de evento; habilitar após Aplicar.
- Busca sem acentos, interseção com continente, limpeza ao selecionar, resumo dos escolhidos com bandeiras/continentes e temporada nos 197 cartões.
- Etapa de cidades, seleção/desmarcação, cidade adicionada pelo usuário, poda de cidades ao remover país e redefinição completa do formulário.
- 197 páginas próprias existentes e executadas em DOM simulado: nome, fatos, foto creditada e pontos turísticos ou destaques do país; arquivos relativos válidos. Fotos e links externos não foram validados visualmente por essa suíte.
- Filtros de mês e companhia nas referências de voos; médias em dinheiro e milhas calculadas somente em fixtures sintéticas de teste, com isolamento de mês, companhia e programa. fare-data.js de produção permanece vazio e a interface mostra indisponibilidade. Nenhuma fixture de preço de teste foi enviada como cotação real.
- Preferências de cidades têm penalidade no motor quando o aeroporto/estação não corresponde à seleção; deslocamentos locais continuam identificados como pendentes.

Downloads reais: GeoNames, guias Wikivoyage e metadados/licenças de fotos Wikimedia Commons, com cache e poucas consultas simultâneas. Não há consulta paga nem média real de preços/milhas disponível nesta versão.
