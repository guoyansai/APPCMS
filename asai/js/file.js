/*
 * @description 获取文件的缓存路径，如果文件未缓存，则直接返回路径，并缓存
 * @method getFileCache
 * @param {String} filePath 完整的图片下载路径，如果没有从缓存中获取到，则用这个路径去下载
 * @param {String} fileId 文件id，必须唯一，如guid
 * @return {Object} promise对象
 */
export function getFileCache(filePath, fileId) {
	const storageKey = 'IMAGE_CACHE_INFO'

	return new Promise((resolve, reject) => {
		try {
			// #ifdef H5

			// h5不进行缓存，直接下载
			uni.downloadFile({
				url: filePath, // 仅为示例，并非真实的资源
				success: ({
					statusCode,
					tempFilePath
				}) => {
					if (statusCode === 200) {
						return resolve(tempFilePath);
					}

					reject('下载失败');
				},
				fail: () => {
					reject('下载失败');
				}
			});
			// #endif

			// #ifndef H5
			// 首先获取本地存储的数据，查询是否有对应文件路径，如果有缓存内容，直接返回
			const cacheFileInfo = uni.getStorageSync(storageKey);
			console.log(666.123321, cacheFileInfo)
			if (cacheFileInfo[fileId]) {

				return resolve(cacheFileInfo[fileId]);
			}

			// 如果没有，执行下载，并存储起来后
			uni.downloadFile({
				url: filePath, // 仅为示例，并非真实的资源
				success: ({
					statusCode,
					tempFilePath
				}) => {
					if (statusCode !== 200) {

						return reject('下载失败');
					}

					// 不管保存成功还是失败，都先将下载结果返回防止等待过长
					resolve(tempFilePath);
					saveFile(tempFilePath);
				},
				fail: (e) => {
					reject('下载失败');
				}
			});

			// 将文件下载至本地并存储
			function saveFile(tempFilePath) {
				uni.saveFile({
					tempFilePath,
					success: ({
						savedFilePath
					}) => {
						// 因为请求是异步的，不能保证存储的时间，所以这里总是重新获取缓存内容
						let storageInfo = Object.assign({}, uni.getStorageSync(storageKey));
						console.log(666.555, storageInfo)
						storageInfo[fileId] = savedFilePath;

						uni.setStorageSync(storageKey, storageInfo);
					}
				})
			}
			// #endif
		} catch (e) {
			console.error('getImageCache():::', e);

			reject('下载失败'); // 出现异常，这里可以做一些异常处理
		}
	})
}
