# LEOZIN TRIPS
Site estático em português, HTML/CSS/JavaScript, sem build, conta ou API paga. Pronto para GitHub Pages. Abra index.html para a entrada ou montar-viagem.html para o planejador.

## Navegação e continentes
A entrada tem sete botões de continente e o acesso Montar viagem no canto superior direito. O catálogo tem 197 países/entidades únicos (193 membros da ONU, Palestina, Vaticano, Kosovo e Taiwan), distribuídos em 204 entradas regionais devido a países transcontinentais. Europa 51; América do Sul 12; América do Norte e Caribe 16; América Central 7; Ásia 50; África 54; Oceania 14. As listas são editoriais, sem representar posição sobre soberania.

Todos os continentes usam a mesma faixa compacta, centralizada e ilustrada de estações. Os meses continuam respeitando hemisférios e as observações locais sobre trópicos/monções. Cada país mostra bandeira local, moeda, cotação com data, idiomas, Voos e os meses de temporada. Trens aparece somente para países com ligação internacional cadastrada. A ausência do botão indica falta de ligação adequada nesta seleção, não prova de inexistência de serviços.

Os filtros Voos diretos de São Paulo e Moeda inferior ao real têm a mesma cor, podem ser combinados e mostram países em linhas horizontais. O filtro monetário compara uma unidade da moeda de referência com R$ 1; não mede custo de vida. Os meses e os filtros Baixa/Média/Alta também funcionam nos sete continentes.

## Sua viagem
Montar viagem abre montar-viagem.html. O título central é SUA VIAGEM.

- Calendário com seleção de ida e volta, campos de data e botão Aplicar. Aplicar valida o intervalo, fecha o calendário e preenche o campo de datas e o número de dias.
- Dias incluem ida e volta. Ida e volta no mesmo dia contam como 1 dia e 0 noites. O cálculo usa datas civis em UTC e não sofre alteração por horário de verão.
- Seleção de 197 países com bandeira, moeda, idioma e botão Selecionar. Pode filtrar por continente, marcar/desmarcar, remover um país do resumo ou limpar a seleção. País transcontinental não se duplica no planejamento.
- Temporada estimada para cada destino, usando todos os meses e dias do intervalo. A temporada aparece abaixo do nome de cada país selecionado e colore seu quadradinho de verde, laranja ou vermelho, também na seleção de países. Não há seção separada de temporada. Se o intervalo atravessa temporadas diferentes, vale a que reúne mais dias; em empate, a mais alta. O detalhe do cálculo fica no título do quadradinho. Ainda não se distribuem dias entre países: o período inteiro é avaliado para cada um.
- Planejamento salvo apenas no localStorage deste navegador, quando permitido. Sem transmissão para servidor ou conta. Se o navegador bloquear o armazenamento, o planejamento continua funcionando na página e um aviso informa o limite.

## Temporadas
As cores são verde (baixa), laranja (média) e vermelho (alta). São perfis editoriais amplos de procura, não dados de ocupação, preços ou previsão meteorológica. Os perfis gerais regionais não substituem pesquisa por cidade, feriado, praia ou estação de esqui. Dez países ficam sem classificação turística suficiente e aparecem como Não definida, em cinza. Ilhas sem pico diferenciado no modelo usam média como referência e têm nota explicativa.

Referências de interpretação, sem reproduzir um levantamento de demanda para todos os países:
- Europa: https://www.ricksteves.com/travel-tips/trip-planning/timing-your-trip e https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Seasonality_in_the_tourist_accommodation_sector
- Japão: https://www.japan.travel/en/gc/tips/
- Austrália: https://www.australia.com/en-gb/facts-and-planning/when-to-go/best-time-to-visit.html
- Brasil: https://www.visitbrasil.com/en/info/climate-and-weather/
- Costa Rica: https://www.visitcostarica.com/plan-your-trip/when-to-visit

## Voos saindo de cada país
Voos aparece em todos os países de todos os continentes. O painel agrupa países e territórios de destino com bandeira, intervalo de tempo estimado e detalhes de cada par de cidades/aeroportos.

A base gratuita AirportMiles foi baixada realmente em 13/11/2026, gerada em 04/11/2026. Foram integradas todas as 9.688 ligações internacionais disponíveis nessa fonte, entre 999 aeroportos. Não é a malha mundial completa. São registros estatísticos de períodos diferentes, inclusive 2022–2024, agregando os dois sentidos: não confirmam operação atual, frequência, partida em um sentido específico ou sazonalidade. Isso é sinalizado no painel e cada rota mostra seu período e fonte. Aeroportos de países vizinhos não contam como saída do país escolhido.

Tempos são estimativas calculadas e simétricas: 48 minutos + distância de grande círculo / 847 km/h, arredondados a cinco minutos. Não são tempos publicados de grade. Fonte: https://airportmiles.com/api . Campos de aeroportos e estimativas são CC0/domínio público; o catálogo derivado de pares é redistribuído sob CC BY-SA 4.0, com atribuições em FLIGHT-DATA-SOURCES.json, incluindo Aerocivil. As licenças das fontes permanecem aplicáveis aos respectivos campos. Este recurso funciona com dados locais, sem API em tempo de execução.

## Trens internacionais
O catálogo ferroviário reúne 49 ligações bilaterais publicadas, entre cidades: 26 da base europeia e 23 complementos internacionais. Os botões aparecem em 63 países únicos, ou 68 cartões regionais, incluindo sobreposições Europa/Ásia. A seleção não cobre todos os países, cidades ou serviços existentes. Há também oito registros especiais europeus separados: ônibus substituto, troca de trem, duração pendente ou operação sazonal. Ônibus/trocas não ativam o botão de um país sem outra ligação adequada.

Cada ligação mostra país de destino com bandeira, cidades, companhia, duração quando disponível e fonte. Tempos ou horários não verificados são identificados, sem copiar horários do sentido contrário. Serviços de referência antigos têm nota própria. Carro direto é identificado quando o mesmo carro é acoplado a trens diferentes.

A grade semanal europeia de referência é 16–22/11/2026, com 51 dos 52 sentidos das 26 ligações contendo algum registro; não garante todas as partidas. Nice–Mônaco tem cobertura parcial de 14/11/2026 identificada separadamente. Belgrado–Bar continua sem horários verificados neste catálogo. Fonte principal: pickthetrain.com, from official open timetables, base de 12/11/2026, https://www.pickthetrain.com/api/ . Base derivada sob ODbL 1.0 (texto em LICENSE-country-data.txt). Créditos adicionais: NMBS-SNCB Open Data, 11 Nov 2026, CC BY 4.0, modificações por Goldcote Ltd; Mobilitätsverbünde Österreich OG, data.mobilitaetsverbuende.at, Datenlizenz Mobilitätsverbünde Österreich.

Fora da Europa, Shuttle Tebrau tem grade-base KTMB com 18 partidas Malásia–Singapura e 13 no sentido inverso; cada viagem dura 5 minutos, sem incluir imigração. A semana de referência é exibida, com aviso de grade-base. TAZARA mostra os dias/horários de partida publicados na retomada de 2026; chegada ainda pendente. As outras novas ligações não recebem horários inventados. As fontes oficiais ou de horários publicadas ficam nos links de cada rota. Confirme operação e grade para a data de viagem.

## Moedas, idiomas e voos de São Paulo
Moedas/idiomas: mledoze/countries, correções editoriais e nomes em português. Bulgária usa EUR desde 01/01/2026; Zimbábue ZWG e USD. Dados derivados em world-data.js sob ODbL 1.0, licença em LICENSE-country-data.txt. Fonte: https://github.com/mledoze/countries . Algumas línguas regionais são resumidas.

Câmbio: API gratuita fawazahmed0/currency-api, provedor alternativo, timeout e validação. Referência local de 12/11/2026, com data e aviso quando usada. Moedas secundárias sem cotação ficam indisponíveis. Valores indicativos, sem spread ou taxas. Fonte: https://github.com/fawazahmed0/exchange-api . O planejador não precisa de internet para avaliar temporadas ou selecionar países.

O filtro de voos de São Paulo mantém 35 rotas selecionadas, com origem GRU, cidades, companhias, duração e dias da semana de referência nos próprios cartões. Não inclui Congonhas/Viracopos. A sazonalidade da GOL para Punta Cana é identificada; as demais não foram aferidas. Não há disponibilidade ou preço em tempo real. Ausência na seleção não comprova ausência de serviço.

## Publicar no GitHub Pages
1. Envie o conteúdo desta pasta à raiz do repositório, incluindo assets e .nojekyll.
2. Em Settings → Pages, escolha Deploy from a branch, main, / (root).
3. Abra o endereço fornecido pelo GitHub. Todos os caminhos internos são relativos.

Não houve publicação automática. Imagem da entrada fornecida pelo usuário. Bandeiras FlagCDN servidas localmente.

## Arquivos e verificação
- Entrada: index.html e home.css. Continentes: sete HTMLs, europe.js e europe.css.
- Dados: europe-data.js, country-info.js, world-data.js, world-flights.js, currency-snapshot.js e currency.js.
- Trens: europe-trains.js, world-trains.js, rail-week.js, world-rail-week.js, train-week-ui.js e trains-ui.js.
- Voos por país: country-flights-data.js e country-flights-ui.js.
- Temporadas: europe-seasons.js e world-seasons.js.
- Planejador: montar-viagem.html, trip.css, trip-core.js e trip.js.
- Rotas: route-planner-core.js, route-planner-ui.js e route-planner.css.

Execute node tests.cjs. Sem dependências de instalação. A suíte usa DOM/rede simulados; os arquivos-fonte de dados foram baixados de fato. Resultados e limites em TESTES.md. Inspeção visual e teste de navegação em navegador permanecem pendentes. Arquivos legados app.js, data.js, styles.css e home.js não são carregados nas páginas atuais.


## Planejar rotas
Após escolher datas e países, Planejar mostra até seis alternativas logo abaixo (até três principais e até três começando com conexão), com ordem dos destinos, cidades/aeroportos/estações, modo de transporte, duração de referência e fontes. As preferências são trens, voos e equilíbrio entre os dois. Se houver apenas uma alternativa distinta na base, isso é informado, sem duplicar uma opção para completar a quantidade.

O primeiro destino é priorizado entre os países selecionados que têm voo publicado sem escala de São Paulo/Guarulhos no catálogo. Quando a ida coincide com a semana de referência, uma rota sem partida naquele dia da semana não é usada como chegada direta. Fora da semana, a data fica não verificada. Brasil selecionado é tratado como ponto de partida em São Paulo, sem inventar um voo de entrada no país.

Dentro de um país com chegada direta publicada, aeroportos adicionais ligados a GRU apenas por registro estatístico podem aparecer como alternativa histórica, identificada separadamente. Não se apresentam como operação atual confirmada. As rotas usam os dados locais de voos e trens já documentados; não há API paga, preço, reserva nem consulta de disponibilidade em tempo real.

Para os países sem chegada direta adequada, o motor também tenta uma conexão por um país com voo de GRU e uma ligação adicional cadastrada, mesmo quando outros destinos da seleção têm voo direto. Entre destinos ou na volta, pode usar uma conexão intermediária composta de dois trechos cadastrados. O país intermediário aparece como trânsito, sem acrescentar uma estadia à seleção. São trechos independentes; a compatibilidade de horários e a viabilidade da conexão não estão verificadas. Não se afirma que uma viagem com troca é trem/voo direto.

A sugestão inclui a volta a São Paulo quando existe registro de ligação; não copia duração ou dias do voo de ida para afirmar a operação no sentido inverso. Se não houver dados adequados, mostra chegada, ligação ou volta a definir. Aeroportos de países vizinhos não são atribuídos a microestados sem aeroporto.

Mudanças de aeroporto/estação e deslocamentos entre cidades são indicados explicitamente. Esses trajetos internos não têm transporte nem duração calculados. O motor dá uma penalidade heurística maior a mudanças de cidade para evitar recomendações baseadas apenas no menor tempo de um voo isolado. A última ligação considera também o aeroporto da volta. Não há tempo total porta a porta nem garantia de conexões viáveis.

Para até 12 países, usa busca limitada por feixe, com preferências de transporte e penalidades para lacunas, referências incompletas e deslocamentos internos; acima disso usa busca gulosa com múltiplos inícios, mantendo o processamento limitado. Não é solução exata de otimização, nem garantia da rota mais rápida/barata. Hubs de conexão também são limitados em seleções grandes. Destinos não se repetem como estadias; um país pode reaparecer como conexão.

Datas delimitam a duração da viagem e a conferência da semana de referência da saída. Ainda não se distribuem noites ou datas de cada trecho entre os países. Há aviso se forem escolhidos mais países que dias ou se a soma dos tempos conhecidos dos trechos já ultrapassar o período; esperas e trajetos internos não estão nessa soma. Editar datas/países invalida o resultado e solicita novo clique em Planejar.

Revalidação pontual de fontes em 13/11/2026: Lufthansa São Paulo–Frankfurt (https://www.lufthansa.com/lhg/br/en/o-d/cy-cy/sao-paulo-frankfurt), Eurostar Londres–Paris (https://www.eurostar.com/uk-en/train/london-to-paris) e documentação AirportMiles (https://airportmiles.com/api). Isso não equivale à confirmação individual das demais rotas ou da data escolhida. A base estatística continua podendo conter serviços alterados ou descontinuados; os avisos na interface devem ser observados.


### Comparar entradas com conexão e trens
O resultado preserva as opções principais por países com voo direto e acrescenta até três esboços começando por países sem chegada direta indicada no catálogo ou para o dia de referência. O primeiro destino é a primeira estadia planejada; o país de conexão é trânsito, sem acrescentar uma estadia à seleção.

Entradas com conexão compara até três referências por país. Prioriza mesmo aeroporto, depois transferência local e depois mudança de cidade; dentro dessas categorias compara tempos e penalidades de referência. Mostra aeroportos, soma dos tempos conhecidos sem espera, necessidade de transfer e links dos dois trechos. Isso não confirma disponibilidade, horários compatíveis, conexão protegida ou menor duração porta a porta. Sem dados adequados, a chegada fica a definir.

Cada opção de rota tem Também compare os trens, com as ligações ferroviárias entre os destinos consecutivos, inclusive quando o transporte principal sugerido for avião. Mostra até três referências com cidades/estações, operadora, duração, fonte e aviso sazonal quando existente. Quando não há trem direto cadastrado, tenta uma ligação com troca por um país intermediário, identificada como tal. Pode haver mudança de estação; espera e deslocamentos internos não são estimados. Sem referência suficiente, informa falta de cobertura, sem afirmar inexistência de serviço.

As sugestões continuam baseadas em dados locais parciais e referências históricas; melhores conexões significa a classificação heurística descrita acima, não uma consulta ao inventário atual das companhias. Em seleções grandes a busca permanece limitada, sem garantia de encontrar todas as alternativas.

## Atualização de seleção, cidades e guias — 15/11/2026
- Datas aplicadas obrigatórias para escolher novos países; busca por nome sem diferenciar acentos, ao lado do filtro de continente, limpa após selecionar um país.
- Resumo abaixo dos filtros com bandeira, nome e continente(s); todos os cartões mostram continente e temporada relativa ao período escolhido.
- Limpar tudo antes da etapa 01 redefine datas, países, cidades e filtros e invalida rotas anteriores.
- Etapa 03 para cidades sugeridas de cada país, com opção de adicionar outra cidade. As seleções são salvas com o planejamento, removidas ao desmarcar o país e orientam a preferência por aeroportos/estações nas rotas. Não se afirma que todos os deslocamentos internos ou dias por cidade estejam resolvidos.
- Os 197 países têm Guia do país nas páginas de continente, apontando para uma página própria em paises/{ISO}.html. Informações essenciais, imagens creditadas e destaques por cidade/país. Fontes e limites em DESTINATIONS-SOURCES.md; fotos remotas precisam de internet.
- Passagens de GRU: filtro de mês/ano e companhia nos dados de voos diretos, com campos separados para média de ida em reais e em milhas/pontos por programa. O cálculo exige no mínimo três amostras verificadas, só ida, sem escala, mesma rota, mês, cabine e companhia. Programas não são misturados.

### Limitação dos preços
fare-data.js começa sem amostras: os campos monetários e de milhas ficam indisponíveis nesta publicação. As fontes gratuitas consultadas não forneceram um histórico comparável por mês da viagem, companhia e programa. Não foram inventadas médias, divididos preços de ida/volta por dois nem convertidos reais em milhas. O mês é da viagem; uma estatística por mês de compra não foi tratada como equivalente. Acrescentar uma fonte apropriada ou uma coleta verificada é necessário para exibir médias reais. As páginas oficiais de LATAM Pass e Azul consultadas descrevem resgates/ofertas; não constituem essa série mensal.

Implementação: destinations-data.js, trip-cities.js, country-guide.js/css, fare-data.js e fare-ui.js. Testes adicionais: destinations-tests.cjs.
