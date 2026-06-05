/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { CacheService } from '../cache/cache.service';
import { TransientService } from '../transient/transient.service';
import { APP_CONFIG, CACHE_SERVICE, LOGGER } from 'src/common/token';

describe('CatsService', () => {
  let service: CatsService;
  let catsRepository: jest.Mocked<CatsRepository>;
  let cacheService: jest.Mocked<CacheService>;
  let loggerMock: jest.Mocked<{ log: jest.Mock }>;

  const mockCats = [
    { id: 1, name: 'Milo' },
    { id: 2, name: 'Felix' },
  ];

  beforeEach(async () => {
    // Mock des dépendances simples
    loggerMock = {
      log: jest.fn(),
    };

    const catsRepositoryMockObj = {
      findAll: jest.fn().mockReturnValue(mockCats),
      findOne: jest
        .fn()
        .mockImplementation((id: number) => mockCats.find((c) => c.id === id)),
    };

    const cacheServiceMockObj = {
      has: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsRepository,
          useValue: catsRepositoryMockObj,
        },
        {
          provide: CACHE_SERVICE,
          useValue: cacheServiceMockObj,
        },
        {
          provide: APP_CONFIG,
          useValue: {
            appName: 'Cats Test App',
            enableCache: true,
          },
        },
        {
          provide: LOGGER,
          useValue: loggerMock,
        },
        TransientService,
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catsRepository = module.get(CatsRepository);
    cacheService = module.get('CACHE_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cats and increment callsCount', () => {
      const result = service.findAll();

      expect(result).toEqual(mockCats);
      expect(catsRepository.findAll).toHaveBeenCalledTimes(1);
      expect(loggerMock.log).toHaveBeenCalledWith(
        'Cats Test App - findAll called',
      );
      expect(service.getFindAllCallsCount()).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a cat from cache if it exists (Cache Hit)', () => {
      const cachedCat = { id: 1, name: 'Milo' };
      cacheService.has.mockReturnValue(true);
      cacheService.get.mockReturnValue(cachedCat);

      const result = service.findOne(1);

      expect(result).toEqual(cachedCat);
      expect(cacheService.has).toHaveBeenCalledWith('cat_1');
      expect(cacheService.get).toHaveBeenCalledWith('cat_1');
      expect(loggerMock.log).toHaveBeenCalledWith('Cache hit for key: cat_1');
      expect(catsRepository.findOne).not.toHaveBeenCalled();
    });

    it('should query the repository and set cache if cache does not exist (Cache Miss)', () => {
      const cat = { id: 2, name: 'Felix' };
      cacheService.has.mockReturnValue(false);

      const result = service.findOne(2);

      expect(result).toEqual(cat);
      expect(cacheService.has).toHaveBeenCalledWith('cat_2');
      expect(loggerMock.log).toHaveBeenCalledWith('Cache miss for key: cat_2');
      expect(catsRepository.findOne).toHaveBeenCalledWith(2);
      expect(cacheService.set).toHaveBeenCalledWith('cat_2', cat);
    });
  });

  describe('getTransientId', () => {
    it('should return the transient instance ID', () => {
      const id = service.getTransientId();
      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });
});
