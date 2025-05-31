import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import AchievementTokensModule from './AchievementTokens';
require('dotenv').config();

const ScarfBank = buildModule('ScarfBankModule', (m) => {
	const { AchievementTokens } = m.useModule(AchievementTokensModule);
	const initialOwner: string = process.env.DEPLOYER_ADDRESS!;
	const ScarfBank = m.contract('ScarfBank', [initialOwner, AchievementTokens]);

	return { ScarfBank };
});

export default ScarfBank;
