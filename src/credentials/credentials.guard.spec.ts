import { CredentialsGuard } from './credentials.guard';

describe('CredentialsGuard', () => {
  it('should be defined', () => {
    expect(new CredentialsGuard()).toBeDefined();
  });
});
