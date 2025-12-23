# Testes Unitários - API Blog School

Neste diretório, desenvolvi os testes unitários para o projeto API Blog School. Escolhi o Jest como framework de testes por sua facilidade de uso e integração com o ecossistema Node.js.

## Estrutura de Testes

Organizei os testes seguindo a mesma estrutura do código-fonte, o que facilita a manutenção e localização dos testes:

```
test/
├── unit/                  # Meus testes unitários
│   └── post/              # Testes para o módulo de posts
│       ├── post.controller.spec.ts  # Testes do controlador
│       └── post.service.spec.ts     # Testes do serviço
├── mocks/                 # Mocks que criei para os testes
└── jest-e2e.json         # Configuração para testes E2E
```

## Como Executar os Testes

Para rodar os testes que implementei, você pode usar estes comandos:

```bash
# Rodar todos os testes
npm test

# Gerar relatório de cobertura
npm run test:cov

# Modo de desenvolvimento (atualiza ao salvar)
npm run test:watch
```

## Cobertura de Código

Consegui gerar um relatório detalhado de cobertura usando o comando `npm run test:cov`. O relatório fica na pasta `coverage/` e pode ser visualizado no navegador abrindo o arquivo `coverage/lcov-report/index.html`.

## Boas Práticas que Apliquei

1. **Testes Focados e Independentes**: Cada teste verifica apenas uma funcionalidade específica, facilitando a identificação de problemas.
2. **Cenários Diversos**: Testei tanto os casos de sucesso quanto possíveis erros que podem ocorrer.
3. **Nomes Descritivos**: Dei nomes claros aos testes para que sirvam como documentação do comportamento esperado.
4. **Isolamento com Mocks**: Criei mocks para simular dependências externas, garantindo que os testes sejam rápidos e confiáveis.

## Como Expandir os Testes

Se você quiser adicionar mais testes ao projeto, sugiro seguir estes passos:

1. Crie um arquivo seguindo o padrão `*.spec.ts` no diretório correspondente ao módulo que deseja testar.
2. Organize seus testes usando blocos `describe` para agrupar funcionalidades relacionadas, como aprendi nas aulas.
3. Utilize os mocks que criei (ou crie novos) para isolar o código que está testando.
4. Execute `npm test` para verificar se seus novos testes estão passando.

## Dicas para o Desenvolvimento

Durante o desenvolvimento deste projeto, percebi que executar os testes antes de cada commit me ajudou a evitar problemas. Você pode configurar um hook de pre-commit para automatizar isso, o que facilita muito o processo de desenvolvimento e garante que novas alterações não quebrem o código existente.