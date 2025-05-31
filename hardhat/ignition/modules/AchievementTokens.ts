import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
require('dotenv').config();

const AchievementTokens = buildModule('AchievementTokensModule', (m) => {
	const initialOwner: string = process.env.DEPLOYER_ADDRESS!;
	const AchievementTokens = m.contract('AchievementTokens', [initialOwner]);

	return { AchievementTokens };
});

export default AchievementTokens;
