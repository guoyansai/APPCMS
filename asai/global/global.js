import GlobalMain from './global-main.json';

const GlobalConst = {
	IG: JSON.parse(JSON.stringify(GlobalMain.G))
};

export default {
	...GlobalConst,
	...GlobalMain
}
