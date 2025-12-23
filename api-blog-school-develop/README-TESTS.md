# Testes Unitários - API Blog School

## Visão Geral

Neste projeto, implementei testes unitários para a API Blog School, com foco nas funcionalidades do CRUD de postagens. Utilizei o framework Jest por sua simplicidade e eficiência, seguindo as boas práticas de testes que aprendi durante o curso.

## Cobertura de Testes

Consegui alcançar uma cobertura de **26.72%** do código, superando a meta mínima de 20% estabelecida pelo professor. Fiquei especialmente satisfeito por ter atingido **100%** de cobertura no módulo de posts (controlador, serviço e DTOs).

## Estrutura de Testes

Organizei os testes seguindo a mesma estrutura do código-fonte para facilitar a manutenção:

```
test/
├── unit/                  # Meus testes unitários
│   └── post/              # Testes para o módulo de posts
│       ├── post.controller.spec.ts  # Testes do controlador
│       └── post.service.spec.ts     # Testes do serviço
├── mocks/                 # Mocks que criei para os testes
│   └── prisma.service.mock.ts      # Mock do Prisma
└── jest-e2e.json         # Configuração para testes E2E
```

## Comandos de Teste

Para facilitar a execução dos testes, configurei os seguintes comandos no package.json:

```bash
# Rodar todos os testes
npm test

# Gerar relatório de cobertura
npm run test:cov

# Modo de desenvolvimento (atualiza ao salvar)
npm run test:watch
```

## Boas Práticas que Apliquei

1. **Testes Focados e Independentes**: Cada teste verifica apenas uma funcionalidade específica, facilitando a identificação de problemas.
2. **Cenários Diversos**: Testei tanto os casos de sucesso quanto possíveis erros que podem ocorrer.
3. **Nomes Descritivos**: Dei nomes claros aos testes para que sirvam como documentação do comportamento esperado.
4. **Isolamento com Mocks**: Criei mocks para simular dependências externas, garantindo que os testes sejam rápidos e confiáveis.

## O Que Implementei

### Testes do Serviço de Posts

No arquivo `post.service.spec.ts`, implementei testes para verificar:

- Criação de novos posts
- Listagem completa dos posts
- Busca de um post específico por ID
- Atualização de informações dos posts
- Remoção de posts do sistema
- Busca de posts por termos específicos

### Testes do Controlador de Posts

No arquivo `post.controller.spec.ts`, desenvolvi testes para garantir que:

- A API cria posts corretamente
- A listagem de posts retorna todos os registros
- A busca por ID encontra o post correto
- As atualizações são aplicadas adequadamente
- A remoção de posts funciona como esperado
- A busca por termos retorna os resultados corretos

## Mocks que Desenvolvi

Para não depender do banco de dados real durante os testes, criei mocks para o serviço Prisma. O arquivo `prisma.service.mock.ts` contém minha implementação desses mocks, que simulam todas as operações necessárias para os testes.

## Próximos Passos

Se eu tivesse mais tempo para o projeto, gostaria de:

1. Implementar testes para os outros módulos (person, comment, school-material)
2. Adicionar mais testes para casos de erro e validação de dados
3. Desenvolver testes de integração entre os módulos
4. Configurar um pipeline de CI para executar os testes automaticamente

## Conclusão

Os testes que implementei fornecem uma base sólida para garantir a qualidade do código e identificar problemas rapidamente durante o desenvolvimento. Estou satisfeito por ter superado a meta de cobertura de 20%, alcançando 26.72%, e acredito que esta base pode ser expandida gradualmente para cobrir mais funcionalidades do sistema em trabalhos futuros.