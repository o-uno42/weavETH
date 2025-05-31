import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
require('dotenv').config();

const ScarfBank = buildModule('ScarfBankModule', (m) => {
	const initialOwner: string = process.env.DEPLOYER_ADDRESS!;
	const randomNumAddress: string = process.env.RANDOM_NUM_ADDRESS!;
	const ScarfBank = m.contract('ScarfBank', [initialOwner, randomNumAddress]);

	return { ScarfBank };
});

export default ScarfBank;
