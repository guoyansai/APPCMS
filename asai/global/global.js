import GlobalMain from './global-main.json';

const GlobalConst = {
	IG: JSON.parse(JSON.stringify(GlobalMain.G))
};

export default {
	...GlobalConst,
	...GlobalMain,
	DataLocal: {
		tools: {
			miyu: require('../../static/datalocal/data/docs/data/tools/co/study/g-miyu/co.json'),
		}
	}
}
