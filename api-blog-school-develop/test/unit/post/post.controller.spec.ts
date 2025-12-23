import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../../../src/post/post.controller';
import { PostService } from '../../../src/post/post.service';
import { CreatePostDto } from '../../../src/post/dto/create-post.dto';
import { UpdatePostDto } from '../../../src/post/dto/update-post.dto';
import { SearchPostsDto } from '../../../src/post/dto/search-posts.dto';

// Mock do PostService
const mockPostService = {
  create: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
  findAll: jest.fn().mockImplementation(() => Promise.resolve([])),
  findOne: jest.fn().mockImplementation(id => Promise.resolve({ id })),
  update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
  remove: jest.fn().mockImplementation(id => Promise.resolve({ id })),
  search: jest.fn().mockImplementation(dto => Promise.resolve([])),
};

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);

    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      // Arrange
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        content: 'Test Content',
        published: true,
        personid: 1,
      };

      const expectedResult = {
        id: 1,
        ...createPostDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPostService.create.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createPostDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockPostService.create).toHaveBeenCalledWith(createPostDto);
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

      mockPostService.findAll.mockResolvedValue(expectedPosts);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedPosts);
      expect(mockPostService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a post by id', async () => {
      // Arrange
      const postId = '1';
      const expectedPost = {
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        published: true,
        personid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPostService.findOne.mockResolvedValue(expectedPost);

      // Act
      const result = await controller.findOne(postId);

      // Assert
      expect(result).toEqual(expectedPost);
      expect(mockPostService.findOne).toHaveBeenCalledWith(+postId);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      // Arrange
      const postId = '1';
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        published: false,
      };

      const expectedResult = {
        id: 1,
        ...updatePostDto,
        personid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPostService.update.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.update(postId, updatePostDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockPostService.update).toHaveBeenCalledWith(+postId, updatePostDto);
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      // Arrange
      const postId = '1';
      const expectedResult = {
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        published: true,
        personid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPostService.remove.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.remove(postId);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockPostService.remove).toHaveBeenCalledWith(+postId);
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

      mockPostService.search.mockResolvedValue(expectedPosts);

      // Act
      const result = await controller.search(searchPostsDto);

      // Assert
      expect(result).toEqual(expectedPosts);
      expect(mockPostService.search).toHaveBeenCalledWith(searchPostsDto);
    });
  });
});