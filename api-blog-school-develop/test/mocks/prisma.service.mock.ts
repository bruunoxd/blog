import { PrismaService } from '../../src/database/prisma.service';

/**
 * Mock do PrismaService para uso em testes unitários
 * 
 * Este mock implementa todas as funcionalidades necessárias do PrismaService
 * para que os testes unitários possam ser executados sem depender de um banco de dados real.
 */

// Criamos uma função de fábrica para o mock para garantir que cada teste tenha uma instância limpa
export const createMockPrismaService = () => ({
  post: {
    create: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    findMany: jest.fn().mockImplementation(() => Promise.resolve([])),
    findUnique: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    delete: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
  person: {
    create: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    findMany: jest.fn().mockImplementation(() => Promise.resolve([])),
    findUnique: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    delete: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
  comment: {
    create: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    findMany: jest.fn().mockImplementation(() => Promise.resolve([])),
    findUnique: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    delete: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
  schoolMaterial: {
    create: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    findMany: jest.fn().mockImplementation(() => Promise.resolve([])),
    findUnique: jest.fn().mockImplementation(() => Promise.resolve(null)),
    update: jest.fn().mockImplementation((args) => Promise.resolve(args.data)),
    delete: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
  $connect: jest.fn().mockImplementation(() => Promise.resolve()),
  $disconnect: jest.fn().mockImplementation(() => Promise.resolve()),
});

// Exportamos uma instância do mock para uso direto
export const mockPrismaService = createMockPrismaService();