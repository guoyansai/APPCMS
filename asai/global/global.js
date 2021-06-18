import GlobalMain from './global-main.json';

const GlobalConst = {
	IG: JSON.parse(JSON.stringify(GlobalMain.G))
};

export default {
	...GlobalConst,
	...GlobalMain,
	DataLocal: {
		tools: {
			README: '通过require()加载数据文件，调用方式DataLocal.tools.README',
		}
	}
}
