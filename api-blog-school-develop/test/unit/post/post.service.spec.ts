import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../../../src/post/post.service';
import { PrismaService } from '../../../src/database/prisma.service';
import { CreatePostDto } from '../../../src/post/dto/create-post.dto';
import { UpdatePostDto } from '../../../src/post/dto/update-post.dto';
import { SearchPostsDto } from '../../../src/post/dto/search-posts.dto';
import { createMockPrismaService } from '../../mocks/prisma.service.mock';

// Criamos uma nova instância do mock para cada teste
const mockPrismaService = createMockPrismaService();

describe('PostService', () => {
  let service: PostService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post successfully', async () => {
      // Arrange
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        content: 'Test Content',
        published: true,
        personid: 1,
      };

      const expectedPost = {
        id: 1,
        ...createPostDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.post.create.mockResolvedValue(expectedPost);

      // Act
      const result = await service.create(createPostDto);

      // Assert
      expect(result).toEqual(expectedPost);
      expect(mockPrismaService.post.create).toHaveBeenCalledWith({
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          published: createPostDto.published,
          personid: createPostDto.personid,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      // Arrange
      const expectedPosts = [
        {
          id: 1,
          title: 'Test Post 1',
          content: 'Test Content 1',
          published: true,
          personid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Test Post 2',
          content: 'Test Content 2',
          published: false,
          personid: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.post.findMany.mockResolvedValue(expectedPosts);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(expectedPosts);
      expect(mockPrismaService.post.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a post by id', async () => {
      // Arrange
      const postId = 1;
      const expectedPost = {
        id: postId,
        title: 'Test Post',
        content: 'Test Content',
        published: true,
        personid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.post.findUnique.mockResolvedValue(expectedPost);

      // Act
      const result = await service.findOne(postId);

      // Assert
      expect(result).toEqual(expectedPost);
      expect(mockPrismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
      });
    });

    it('should return null if post not found', async () => {
      // Arrange
      const postId = 999;
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.findOne(postId);

      // Assert
      expect(result).toBeNull();
      expect(mockPrismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
      });
    });
  });

  describe('update', () => {
    it('should update a post successfully', async () => {
      // Arrange
      const postId = 1;
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        published: false,
      };

      const expectedPost = {
        id: postId,
        ...updatePostDto,
        personid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.post.update.mockResolvedValue(expectedPost);

      // Act
      await service.update(postId, updatePostDto);

      // Assert
      expect(mockPrismaService.post.update).toHaveBeenCalledWith({
        where: { id: postId },
        data: {
          title: updatePostDto.title,
          content: updatePostDto.content,
          published: updatePostDto.published,
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a post successfully', async () => {
      // Arrange
      const postId = 1;
      const expectedPost = {
        id: postId,
        title: 'Test Post',
        content: 'Test Content',
        published: true,
        personid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.post.delete.mockResolvedValue(expectedPost);

      // Act
      const result = await service.remove(postId);

      // Assert
      expect(result).toEqual(expectedPost);
      expect(mockPrismaService.post.delete).toHaveBeenCalledWith({
        where: { id: postId },
      });
    });
  });

  describe('search', () => {
    it('should search posts by query', async () => {
      // Arrange
      const searchPostsDto: SearchPostsDto = {
        query: 'test',
      };

      const expectedPosts = [
        {
          id: 1,
          title: 'Test Post',
          content: 'Test Content',
          published: true,
          personid: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          person: {
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      ];

      mockPrismaService.post.findMany.mockResolvedValue(expectedPosts);

      // Act
      const result = await service.search(searchPostsDto);

      // Assert
      expect(result).toEqual(expectedPosts);
      expect(mockPrismaService.post.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: searchPostsDto.query } },
            { content: { contains: searchPostsDto.query } },
          ],
        },
        include: {
          person: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    });
  });
});