import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistController } from './watchlist.controller';

describe('Watchlist Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WatchlistController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WatchlistController = module.get<WatchlistController>(WatchlistController);
    expect(controller).toBeDefined();
  });
});
