var COS = require('./cos-wx-sdk-v5/index.js');

const cos = new COS({
  SecretId:'AKIDg0A5oIyrdB2fCXpQLp5SaTFnSr7BDdz5',
  SecretKey:'0LdlfKSLRKzQcdR5SZUAdrcBWdiz1pSs'
})
// export default cos
const BucketConfig = {
  Bucket: 'prodlive-1300616667',
  Region: 'ap-shanghai'
}
/**
 * @param {String} fileName
 * @param {String} filePath
 * @param {String} Dir
 * @return {String} imgURL
 * */
function upImg(fileName, filePath, dir) {
	if(!dir) {
		dir = 'img/'
	}
	return new Promise((resolve, reject) => {
		cos.postObject({
			Bucket: BucketConfig.Bucket,
			Region: BucketConfig.Region,    
			Key: dir+fileName,
			FilePath: filePath,            
			onProgress: function(progressData) {
			    console.log(JSON.stringify(progressData));
			}
		}, (err, data) => {
			console.log(err || data)
			if(err) { reject(err) }
			resolve(data)
		})
	})
}
export default upImg
