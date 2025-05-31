import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import ScarfBankModule from './ScarfBank';
require('dotenv').config();

const MemoryTokensModule = buildModule('MemoryTokensModule', (m) => {
  const { ScarfBank } = m.useModule(ScarfBankModule);
  const initialOwner: string = process.env.DEPLOYER_ADDRESS!;

  const MemoryTokens = m.contract('MemoryTokens', [initialOwner, ScarfBank]);

  return { MemoryTokens };
});

export default MemoryTokensModule;
